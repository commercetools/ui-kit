// https://github.com/americanexpress/jest-image-snapshot/blob/HEAD/examples/image-reporter.js

/* eslint-disable class-methods-use-this, no-console */

const chalk = require('chalk');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const glob = require('glob');
const path = require('path');
const branch = require('git-branch');

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
      const rootDir = this._globalConfig.rootDir;
      const diffImages = glob.sync(
        `${rootDir}/**/__image_snapshots__/__diff_output__/*.png`
      );
      diffImages.forEach(imagePath => {
        const branchName = branch.sync();
        const relativePath = path.relative(rootDir, imagePath);
        const key = `${branchName}/${relativePath}`;
        const params = {
          Body: fs.readFileSync(imagePath),
          Bucket: bucket,
          Key: key,
          ContentType: 'image/png',
          ACL: 'public-read',
        };
        s3.putObject(params, err => {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(
              chalk.red.bold(
                `Uploaded image diff file to https://${bucket}.s3.amazonaws.com/${key}`
              )
            );
          }
        });
      });
    }
  }
}

module.exports = ImageReporter;
