# node-restful-shop

## Abstract

This project is created for self-learning purpose, following the instructions by [AcadeMind's RESTful Api with Node.js Course](https://www.youtube.com/watch?v=0oXYLzuucwE&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=1).

## Knowledge Cover

-   Node.js
-   Express.js
-   CORS
-   Restful API
-   MongoDB Atlas
-   Mongoose
-   Authencation

## How to use

1. Clone Project into your local machine

```
git clone https://github.com/LQF2020/node-restful-shop.git
```

2. Go into project folder and install packages.

```
cd node-restful-shop
npm install
```

3. Create your cloud mongoDB account, go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   After creating your cloud db server, follow step 4 to link this app to cloud DB.

4. Create Environment configuration file `.env` under your root directory, with the following content completed.

```
DB_HOST=%YOUR_DB_HOST%
DB_USER=%YOUR_DB_USER_NAME%
DB_PASS=%YOUR_DB_PASSWORD%
DB_NAME=%YOUR_DB_NAME%
BASE_URL=%YOUR_BASE_URL%  // e.g. HTTP://127.0.0.1:3000
JWT_SECRET=%A_SECRET_FOR_GENERATING_API_ACCESS_TOKEN%

JWT_EMAIL_SECRET=%A_SECRET_FOR_GENERATING_EMAIL_VERIFICATION_TOKEN%


SENDER_EMAIL_HOST=%SENDER_EMAIL_HOST%
SENDER_EMAIL_PORT=%SENDER_EMAIL_PORT%
SENDER_EMAIL_ID=%SENDER_EMAIL%
SENDER_EMAIL_PASSWORD=%SENDER_EMAIL_PASSWORD%
```

4. Start project

```
npm start
```
