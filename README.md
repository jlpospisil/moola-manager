# Moola Manager
Moola Manager is an application for tracking accounts, transactions, and budgets.  It is designed to be run on devices with a a small form factor using any web browser or to be wrapped using cordova.  It will work on larger devices, but the layout has been optimized for smaller devices.  This project includes the front end application as well as the backend API which use the following frameworks/libraries:

### Client
* React
* Redux
* React Router
* Bootstrap
* Onsen UI
* Sass

### Server
* Node.js
* Express.js
* MongoDB
* Mongoose.js

# Installation
There are two parts to this project; the front end application and the backend API.  They can be installed as follows:

### Install API Dependencies
	cd server && npm instal

### Install Application Dependencies
	cd client && npm install

### Start API
	cd server && npm run start

### Start Application
	cd client && npm run start
	browse to http://localhost:3000 to view the application