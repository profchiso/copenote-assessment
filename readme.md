# Okorie-Chinedu-Sunday

Repository for COPE NOTES technical assessment o

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

- The hosted or live and working API can be found **[here](https://exchange-crypto-fiat.netlify.app/)**

- Both the frontend and the backend application are Dockerized. At the root folder of the both applications is a **Dockerfile** which contains the docker directives to create the Docker container for the applications.
- Both the frontend and the backend application use the latest version of **node** **_18.7.0_** and **npm** **_8.15.0_**

- The frontend application uses the latest version of React.

- The application working demo video can be found and downloaded **[here](https://github.com/redacreltdcom/Okorie-Chinedu-Sunday/blob/main/demo.mp4)**

- There are two demo videos available **[demo1](https://github.com/redacreltdcom/Okorie-Chinedu-Sunday/blob/main/demo1.mp4)** and **[demo2](https://github.com/redacreltdcom/Okorie-Chinedu-Sunday/blob/main/demo.mp4)** Demo1 was when my **COINAPI_KEY** has exceeded the maximum allowed request to the coinapi.io api so the amount was not populated after selecting the coin, coin amount and fiat . while the **demo2** was when my **COINAPI_KEY** was still active. You will have a seemless demo if you setup the application locall and run it using a newly generated **COINAPI_KEY** instead.

- The **[coinapi.io](https://docs.coinapi.io/#get-all-current-rates-get)** API that I used has rate limits and the get live exchange rate may not work properly on the deployed application if the rate limit has been exceeded. So it is recommended to to set up the applications locally and test in a situation where the rate limit has been exceeded.
