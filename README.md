# The Book of Gloop

Nodejs express server and React front-end for the Book of Gloop web app.

The server provides an API and serves a static build of the React app. Data is stored as json files in Google Drive and is accessible to the front end via the API.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Getting Started

## Prerequisites

- NodeJs (>=20.0.0)
- React
- Google Cloud Project with OAuth and Drive API enabled
- Google Drive folder for storing recipes

## Environment

The application data will be directed to the folder on Google Drive with folderId given by the environmental variable GOOGLE_DRIVE_FOLDER_ID, which can be retrieved by inspecting the URL with the folder open in the browser.

Additional variables are required for authentication (see below).

# Deployment to Heroku

The deployment to heroku was previously configured by the app.json file in the project root.

Create an app on Heroku

`heroku create -a book-of-gloop`

Add the Heroku apps as a git remote:

`heroku git:remote -a book-of-gloop`

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

## Important Note for Authentication

⚠️ **Google OAuth environment variables must be set BEFORE the React app is built.** Since this app uses Create React App, the frontend environment variables (prefixed with `REACT_APP_*`) are embedded at build time. This means:

- On Railway/Render, set all `REACT_APP_*` variables in the project settings BEFORE deploying
- The build will fail or auth will not work if these are missing during build
- Required frontend variables: `REACT_APP_GOOGLE_OAUTH_CLIENT_ID`
- Required backend variables: `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_DRIVE_FOLDER_ID`

# Local development

Firstly, create .env files containing the authentication variables (see below): put one in the client directory and one in server (DO NOT commit these).

## Client

To install the requirements:

`cd client && npm install`

To start the react app without the server:

`cd client && npm start`

The server will serve the static build at client/build. To create a new build:

`cd client && npm run build`

Note: Google Drive data will not be accessible without the server running

## Server

To install the requirements, from the project root:

`npm install`

To start the server (with auto-refresh):

`cd server && nodemon index.js`

The API implements the following endpoints:

- GET /api/recipes/list: list the files by name and their ids for download
- GET /api/recipes/download: download the data for a given file id
- POST /api/recipes/create: create a new file given a name and data
- PUT /api/recipes/update: update an existing file

# Authentication

## Google OAuth 2.0

The app now uses Google OAuth 2.0 for authentication. Users sign in with their Google accounts, and access to recipes is controlled by Google Drive folder sharing.

### Setup Instructions

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable APIs**
   - Enable the **Google Drive API**
   - Enable the **Google People API** (for user profile info)

3. **Create OAuth 2.0 Credentials**
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - Select **Web application** as the application type
   - Add authorized JavaScript origins:
     - For local development: `http://localhost:3000`
     - For production: your deployed app URL (e.g., `https://book-of-gloop.up.railway.app`)
   - Add authorized redirect URIs:
     - For local development: `http://localhost:3000`
     - For production: your deployed app URL
   - Copy the **Client ID** and **Client Secret**

4. **Share the Google Drive Folder**
   - Open your Google Drive folder in the browser
   - Click **Share** and add the email addresses of users who should have access
   - Users must be signed in with the same Google account that has access to the folder

### Required Environment Variables

#### Frontend (prefixed with REACT_APP_)
- `REACT_APP_GOOGLE_OAUTH_CLIENT_ID`: Your Google OAuth Client ID

#### Backend
- `GOOGLE_OAUTH_CLIENT_ID`: Your Google OAuth Client ID (same as frontend)
- `GOOGLE_OAUTH_CLIENT_SECRET`: Your Google OAuth Client Secret
- `GOOGLE_DRIVE_FOLDER_ID`: The ID of your Google Drive folder (from the URL)

### How Access Control Works

1. User signs in with Google on the frontend
2. Frontend receives a Google OAuth token
3. Frontend sends this token with each API request in the `Authorization: Bearer <token>` header
4. Backend validates the token using Google's API
5. Backend uses the user's token to access Google Drive
6. **Google Drive enforces permissions** - if the user's Google account doesn't have access to the folder, the API call will fail with a 403 error

This means you control access by:
- Sharing the Google Drive folder with specific Google accounts
- Users can only access recipes if their Google account has access to the folder
- No user management needed in the app itself

# Google Drive Setup

## Service Account (Legacy - No Longer Used)

The app previously used a service account, but now uses user credentials via OAuth. The service account approach is no longer needed.

## User Credentials (Current)

The app now uses the signed-in user's credentials to access Google Drive. This means:
- Each user accesses Google Drive as themselves
- Folder sharing in Google Drive controls who can read/write recipes
- No need to manage users in the app

# Migration from Auth0

If you were previously using Auth0:

1. **Remove Auth0 environment variables**
   - Remove `REACT_APP_AUTH0_*`, `AUTH0_*` variables

2. **Add Google OAuth environment variables**
   - Add `REACT_APP_GOOGLE_OAUTH_CLIENT_ID` (frontend)
   - Add `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET` (backend)

3. **Share the Google Drive folder**
   - Ensure all users have access to the folder via their Google accounts

4. **Redeploy**
   - The app will now use Google OAuth instead of Auth0
