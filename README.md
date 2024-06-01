# Employ.me

Employ.me is a web application that scrapes together job postings from major job-hunting platforms and provides automation services for the user to track their application for job postings they are interested in. This project was the winning entry for SENG2021 at UNSW and our team (AT3K) received the Macquarie Group Software Engineering prize for 1st place in SENG2021.

<a href="https://employ.me.timz.dev/">Deployed prototype here</a> 🚀

Built with:
- React with Material UI
- Flask
- MongoDB

## Features

A list of features Employ.me offers:
- Scrapes job postings from several sources and allows you to automate your job application tracking with a single click
- Manage and see your job applications in intuitive views:
    - Spreadsheet — including filters, selectable columns, searching, and more
    - Kanban board — clearly captures the state of each job application
    - Calendar — highlights critical events such as upcoming interviews
- Personalise your job boards, write notes for each job application using an integrated rich text editor
- Statistics and automatic activity recording — allows you to access insights about your long term progress and career development through a statistics dashboard
- Social networking
    - Connect with other users, see the resumes they have chosen to upload
    - Receive valuable constructive criticism for your public resume and job profile from your peers. Leave feedback for your peers and the community will vote you up
    - Automatically constructs a profile for you, based on a resume you upload (an opt-in experience)

<hr />


## Setup Instructions

Running the frontend development server
```shell
git clone https://github.com/Tymotex/Employ.me.git
cd client
npm install

# View the locally hosted frontend on http://localhost:3000/
npm start
```

Backend setup
```shell
cd server
pip3 install -r requirements.txt

# Install Resume parser dependencies
# 1. spaCy
python -m spacy download en_core_web_sm
# 2. nltk
python -m nltk.downloader words
python -m nltk.downloader stopwords

# Start the backend server.
python3 start.py
```

Set the environment variables in `server/JobTracker/.env`:

```python
SECRET_KEY="senpai"
GOOGLE_CLIENT_ID="client id here. Get one at http://console.cloud.google.com/"
GOOGLE_CLIENT_SECRET="client secret here. Get one at http://console.cloud.google.com/"
DB_URI="mongodb+srv://<username>:<password>@<clusterName>.vznsj.mongodb.net/jobtracker?retryWrites=true&w=majority"   # Set up a MongoDB cloud instance here: https://docs.atlas.mongodb.com/getting-started/
ENV_TYPE="development"
# ENV_TYPE="production"

# Google Auth callback and redirect URLs:
DEV_REQUEST_REDIRECT_URI="http://127.0.0.1:5000/api/auth/googlelogin/callback"
PROD_REQUEST_REDIRECT_URI="https://jobtracker.club/api/auth/googlelogin/callback"

DEV_CLIENT_HOME_URL="http://localhost:3000"
PROD_CLIENT_HOME_URL="https://employ-me.netlify.app"
```

# Developer Notes

## Frontend Directory Structure

```
client/
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md
└── src
    ├── AT3K                      # Where AT3K's files are
    │   ├── components            # Where AT3K's React Components are defined
    │   │   ├── job-boards        # Dashboard workspace page's components
    │   │   ├── job-dashboard     # Dashboard index page's components
    │   │   ├── job-lists         # Job search page components
    │   │   ├── job-details       # Job detail page's components
    │   │   ├── job-map           # Job detail page's embedded map component
    │   │   ├── company-profile   # Company profile page's components
    │   │   ├── profile           # User profile components
    │   │   ├── statistics        # Statistics page components
    │   │   └── settings          # Settings page components
    │   ├── layouts               # Where AT3K's base React Components are defined
    │   │   ├── AT3KLayout.js
    │   │   ├── index.js
    │   │   ├── mainContentStyles.module.scss
    │   │   ├── menuItems.js
    │   │   └── README.md
    │   ├── pages                 # Where AT3K's page components (and routes) are defined
    │   │   ├── 404.js
    │   │   ├── FAQ.js
    │   │   ├── Community.js
    │   │   ├── CompanyProfile.js
    │   │   ├── Home.js
    │   │   ├── JobDashboard.js
    │   │   ├── JobDashboardIndex.js
    │   │   ├── JobDashboardWorkspace.js
    │   │   ├── JobDetails.js
    │   │   ├── JobSearch.js
    │   │   ├── Profile.js
    │   │   ├── ProfileEdit.js
    │   │   ├── RouterList.js     # Where front-end routes are defined
    │   │   ├── Settings.js
    │   │   └── Statistics.js
    │   └── themes                # Where global Material UI styling rules are defined
    │       ├── default.js
    │       └── index.js
    ├── components                # Reused base components 
    ├── context
    ├── images
    ├── index.js
    └── pages                     # Base pages
```

## Backend Directory Structure

```
server
├── JobTracker                      # Main package
│   ├── api_routes/                 # Where routes are defined and handled
│   │   ├── __init__.py
│   │   ├── auth.py                 # /api/auth routes
│   │   ├── company.py              # /api/company routes
│   │   ├── job.py                  # /api/job routes
│   │   ├── jobs.py                 # /api/jobs routes
│   │   ├── stats.py                # /api/stats
│   │   ├── tracker.py              # /api/tracker
│   │   └── user.py                 # /api/user routes
│   ├── database_ops.py             # Database interface helper functions
│   ├── exceptions/                 # Custom exceptions thrown by the server
│   ├── __init__.py                 # Where the Flask app is instantiated and configured
│   ├── routes.py                   # Where routers are registered to the Flask app
│   ├── static/                     # Public assets served by Flask
│   ├── templates/                  # HTML files served by Flask (only for testing API routes during development)
│   └── utils/                      # General utilities for debugging, testing, etc.
├── requirements.txt
├── setup.py
└── start.py                        # Basic script for starting the server
```
