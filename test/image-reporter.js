// https://github.com/americanexpress/jest-image-snapshot/blob/HEAD/examples/image-reporter.js

/* eslint-disable class-methods-use-this, no-console */

const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const glob = require('glob');
const path = require('path');

const bucket = process.env.VRT_BUCKET;

const s3 = new S3({
  apiVersion: '2006-03-01',
  Bucket: bucket,
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
});

class ImageReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    if (results.numFailedTestSuites > 0) {
      console.log('📷 Creating diff page ...');
      const rootDir = this._globalConfig.rootDir;
      const diffImages = glob.sync(
        `${rootDir}/**/__image_snapshots__/__diff_output__/*.png`
      );
      const dir = `${process.env.TRAVIS_BRANCH}/${process.env.TRAVIS_BUILD_ID}`;

      // upload images
      const diffs = diffImages.map(imagePath => {
        const relativePath = path.relative(rootDir, imagePath);
        const key = `${dir}/${relativePath}`;

        return {
          key,
          relativePath,
          source: imagePath,
          url: `https://${bucket}.s3.amazonaws.com/${key}`,
        };
      });

      diffs.forEach(diff => {
        s3.putObject(
          {
            Body: fs.readFileSync(diff.source),
            Bucket: bucket,
            Key: diff.key,
            ContentType: 'image/png',
            ACL: 'public-read',
          },
          err => {
            if (err) console.log(err, err.stack);
            // return `https://${bucket}.s3.amazonaws.com/${key}`;
          }
        );
      });

      // create index.html file
      const indexHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>UI Kit VRT</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="background-color: lightgrey">
  <h2>Test run</h2>
  <ul>
    <li><b>Commit</b> ${process.env.TRAVIS_COMMIT}</li>
    <li><b>Branch</b> ${process.env.TRAVIS_PULL_REQUEST_BRANCH}</li>
    <li><b>Build</b> <a href="${
      process.env.TRAVIS_BUILD_WEB_URL
    }" target="_blank">${process.env.TRAVIS_BUILD_NUMBER}</a></li>
    <li><b>Repo</b> ${process.env.TRAVIS_REPO_SLUG}</li>
  </ul>
  <pre>${process.env.TRAVIS_COMMIT_MESSAGE}</pre>
  <h2>Results</h2>
  ${diffs.map(
    diff => `
  <h3>
    <code>${diff.relativePath}</code>
  </h3>
  <img src="${diff.url}" />`
  )}
</body>
</html>`;
      const key = `${dir}/index.html`;
      s3.putObject(
        {
          Body: indexHtml,
          Bucket: bucket,
          Key: key,
          ContentType: 'text/html',
          ACL: 'public-read',
        },
        err => {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(
              `📸 Uploaded image diffs to https://${bucket}.s3.amazonaws.com/${key}`
            );
          }
        }
      );
    }
  }
}

module.exports = ImageReporter;
