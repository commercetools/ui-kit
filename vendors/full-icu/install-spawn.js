// Copyright (C) 2015-2016 IBM Corporation and Others. All Rights Reserved.

// Install by using spawn

var path = require('path');
var fs = require('fs');
var child_process = require('child_process');

var isglobal = process.env.npm_config_global === 'true';

module.exports = function npmInstallNpm(fullIcu, advice) {
	var icupkg = fullIcu.icupkg;
	var icudat = fullIcu.icudat;

	var cmdPath = nodePath = process.env.npm_node_execpath;

	var npmPath = process.env.npm_execpath;

	var args;


	if ( /yarn((.*cli)?\.js)?$/.test(npmPath) ) {
		console.log('Looks like you are using yarn…');
		installVerb = 'add';
		args = [ npmPath, 'add', icupkg, '--no-lockfile', '--ignore-scripts' ];
	} else if(npmPath) {
		args = [ npmPath, 'install', icupkg ];
	} else {
		// attempt to launch npm.
		// do not try yarn here
		console.log('(Hmm… doesn’t look like NPM called us. Let’s try calling NPM.)');
		cmdPath = 'npm';
		args = [ 'install', icupkg ];
	}

	console.log('full-icu$', cmdPath, args.join(' '));
	var spawned = child_process.spawnSync(cmdPath, args, { stdio: 'inherit' });
	if(spawned.error) {
		throw(spawned.error);
	} else if(spawned.status !== 0) {
		throw(Error(cmdPath + ' ' + args.join(' ') + ' --> status ' + spawned.status));
	} else {
		var datPath;
		if(isglobal) {
			datPath = path.join('..','icu4c-data',icudat);
		} else {
			datPath = path.join('node_modules','icu4c-data',icudat);
		}
		if(fs.existsSync(icudat)) {
			console.log(' √ ' + icudat + " (existing link?)");
		} else if(!fs.existsSync(datPath)) {
			console.log(' • ' + ' (no ' + icudat + ' at ‘' + datPath+'’)');
		} else {
			try {
                fs.linkSync(datPath, icudat);
                console.log(' √ ' + icudat + " (link)");
			} catch(e) {
				fs.symlinkSync(datPath, icudat);
				console.log(' √ ' + icudat + " (symlink)");
			}
		}
		if(!fullIcu.haveDat()) {
			throw Error('Somehow failed to install ' + icudat);
		} else {
			advice();
		}
	}
};
