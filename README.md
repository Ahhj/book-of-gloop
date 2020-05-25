# The Book of Gloop

Nodejs express server and React front-end app for the Book of Gloop.

## Overview

The server provides an API and serves a static build of the React app. The API retrieves and serves JSON files from Google Drive containing the recipes and implements the following endpoints:

- GET /api/list: list the recipes and their fileIds for download
- GET /api/download: download the data for a recipe
- POST /api/create: create a new recipe
- PUT /api/update: update an existing recipe

## Local Development

To start the server (with auto-refresh):
`cd server && nodemon index.js`

To start the react app without the server:
`cd client && npm start`

The server will serve the static build at client/build. To create a new build:
`cd client && npm run build`

The server requires a credentials.json file to authenticate with Google Drive (see below).

## Deployment

Install the heroku CLI https://devcenter.heroku.com/articles/heroku-cli

Add the Heroku apps as a git remote:
`heroku git:remote -a book-of-gloop-dev && git remote rename heroku heroku-dev`
`heroku git:remote -a book-of-gloop && git remote rename heroku heroku-prod`

Push the app to Heroku:
`git push heroku-dev master`
`git push heroku-prod master`

## Authentication

The server authenticates with Google Drive using credentials stored in server/credentials.json which is downloaded from Google (DO NOT commit this file). When the server starts on Heroku, it will first run server/setupCredentials.js which creates server/credentials.json on the Heroku side. To access the credentials on Heroku create two environmental variables:

- GOOGLE_APPLICATION_CREDENTIALS: the path to the credentials file on Heroku
  `heroku config:add GOOGLE_APPLICATION_CREDENTIALS="server/credentials.json"`
- GOOGLE_CONFIG: a string holding the credentials
  `heroku config:add GOOGLE_CONFIG="$(< server/credentials.json)"`
