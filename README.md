# The Book of Gloop

Nodejs express server and React front-end for the Book of Gloop web app.

The server provides an API and serves a static build of the React app. Data is stored as json files in Google Drive and is accessible to the front end via the API.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Getting Started

## Prerequisites

- NodeJs
- React
- Google Drive with API enabled https://developers.google.com/drive/api/v3/quickstart/nodejs
- Auth0 (see Authentication section)

## Environment

The application data will be directed to the folder on Google Drive with folderId given by the environmental variable GOOGLE_DRIVE_FOLDER_ID, which can be retrieved by inspected the URL with the folder open in the browser.

Additional variables are required for authentication (see below).

# Deployment to Heroku

The deployment to heroku was previously configured by the app.json file in the project root.

Create an app on Heroku

`heroku create -a book-of-gloop`

Add the Heroku apps as a git remote:

`heroku git:remote -a book-of-gloop`

Add the Auth0 addon through the Heroku portal. Add the required environmental variables for authentication to the app on Heroku (see below). Note: environmental variables must be set on the app before the push (the variables are passed to the React app at build time, so they cannot be set after the build.)

Push the app to Heroku:

`git push heroku master`

# Deployment to Railway or Render (Recommended)

For modern deployment, use Railway or Render instead of Heroku.

## Railway

1. Go to [Railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select the `book-of-gloop` repository and the `resurrection` branch
4. Railway will auto-detect Node.js and deploy
5. **Add Environment Variables** (see below for required variables)
6. The app will be live at the provided URL

## Render

1. Go to [Render.com](https://render.com) and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub repository, select `resurrection` branch
4. Set **Build Command**: `npm install && npm run build`
5. Set **Start Command**: `npm start`
6. **Add Environment Variables** (see below for required variables)
7. Click "Create Web Service"

## Important Note for Auth0

⚠️ **Auth0 environment variables must be set BEFORE the React app is built.** Since this app uses Create React App, the frontend environment variables (prefixed with `REACT_APP_`) are embedded at build time. This means:

- On Railway/Render, set all `REACT_APP_*` variables in the project settings BEFORE deploying
- The build will fail or auth will not work if these are missing during build
- Required frontend variables: `REACT_APP_AUTH0_CLIENT_ID`, `REACT_APP_AUTH0_DOMAIN`, `REACT_APP_AUTH0_AUDIENCE`
- Required backend variables: `AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, `AUTH0_AUDIENCE`, `GOOGLE_CONFIG`, `GOOGLE_DRIVE_FOLDER_ID`

# Local development

Firstly, create .env files containing the authentication variables (see below): put one in the client directory and one in server (DO NOT commit these).

## Client

To install the requirements:

`cd client && npm install`

To start the react app without the server:

`cd client && npm start`

The server will serve the static build at client/build. To create a new build:

`cd client && npm run build`

Note: Google Drive data not be accessible without the server running

## Server

To install the requirements, from the project root:

`npm install`

To start the server (with auto-refresh):

`cd server && nodemon index.js`

The API implements the following endpoints:

- GET /api/list: list the files by name and their ids for download
- GET /api/download: download the data for a given file id
- POST /api/create: create a new file given a name and data
- PUT /api/update: update an existing file

# Authentication

## Google Drive API

The server interacts with Google Drive using service account credentials (for more details see https://developers.google.com/drive/api/v3/quickstart/nodejs). Note: folders must be shared with the service account to enable access via the Google Drive API.

The server requires the following environmental variables to authenticate with Google Drive:

- GOOGLE_APPLICATION_CREDENTIALS: the path to the credentials file
- GOOGLE_CONFIG: a string holding the credentials json object

TIP: to extract the contents of credentials.json to an environmental variable use

`GOOGLE_CONFIG="$(< server/credentials.json)"`

## Auth0

Users are authenticated using Auth0. The user must login using Auth0 on the front end to interact with the app and the web API.

The server and client need the following environmental variables to authenticate with Auth0 (note: for the react app these must be prepended with REACT_APP_):

- AUTH0_CLIENT_ID: id for the application obtained through the Auth0 portal
- AUTH0_DOMAIN: id for the application domain obtained through the Auth0 portal
- AUTH0_AUDIENCE: identifier for the API configured through the Auth0 portal.

For more details on getting started with Auth0 for a React/Node application, see https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/.
