# Okorie-Chinedu-Sunday

Repository for COPE NOTES technical assessment.

# Introduction

This repository contains the codebase for a technical assessment from COPE NOTES. The codebase is written with nodejs and expressjs. The database used is monogdb

## Folder Structure

1. **controllers** : This contains the business logic for the application.
2. **cron-jobs** : This contains the logics that runs at intervals of **MINUTES** as specified **[here](https://github.com/profchiso/copenote-assessment/blob/main/sample.env)**.
3. **database** : This contains folder and files related to database. The database used for this application is mongodb.
4. **routes** : This contains files and logics related to the API routes.
5. **utils** : This contains utility logics and functions etc.

## How to set up the backend application

1. Clone this repository using the command `git clone https://github.com/profchiso/copenote-assessment.git`
2. Change directory to the cloned project root folder
3. Install all dependencies using the command `npm install`
4. Set the environment variables as found **[here](https://github.com/profchiso/copenote-assessment/blob/main/sample.env)** **Note** you have to generate the **SENDGRID_API_KEY** from **[SendGrid](https://sendgrid.com/)**

5. Make sure to set the **SENDER_EMAIL** environment variable to your sendgrid verified email address

6. Run the application using the command `node app.js` or `npm start`

# Other informations

- The hosted or live and working API can be found **[here](https://cope-notes-api.herokuapp.com/)**
- The API documentation can be found **[here](https://documenter.getpostman.com/view/7669287/VUqrMGrH)**
