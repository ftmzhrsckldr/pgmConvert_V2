'use strict';
const url = require('url');
const path = require('path');

var app = require('electron').app;

var BrowserWindow = require('electron').BrowserWindow;

var os = require('os');
var request = require('request');

var { dialog } = require('electron');

var mainWindow = null;
var ipc = require('electron').ipcMain;
let {PythonShell} = require('python-shell');

ipc.on('close-main-window', function () {
	app.quit();
});

app.on('ready', function () {
	mainWindow = new BrowserWindow({
		resizable: true,
		height: 600,
		width: 800,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "/app/index.html"),
			protocol: "file:",
			slashes: true

		})
	);
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});

	ipc.on('open-file-dialog-for-file', function (event) {

		dialog.showOpenDialog({
			properties: ['openFile']
		}).then((data) => {
			var fpath = data.filePaths;
			console.log(fpath);
			var options = {
				scriptPath : path.join(__dirname, '/engine/'),
				args : [fpath]
			  };

			  let pyshell = new PythonShell('img_to_dxf.py', options);


		});


	});



});