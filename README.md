# Node-Restful-API-Swagger

This is A node.js based RESTful CURD demo project, providing general functions like User Signup and Login, APIs Authorization , using RESTful apis to create/update/get/delete products and orders.

# Knowledge Cover

-   Swagger & OpenApi 3.0
-   Node.js
-   Express.js
-   CORS
-   Restful API
-   MongoDB Atlas
-   Mongoose
-   JWT Authorization
-   OpenApi and swagger
-   Docker

# How to use

## 1. Clone Project into your local machine

```
git clone https://github.com/LQF2020/node-restful-api-swagger.git
```

## 2. Go into project folder and install project dependencies.

```
cd node-restful-api-swagger && npm i
```

## 3. Make sure mongoDB Server service is installed and running on localhost:27017.

Default DB URIs as follows, feel feel to change it based on your need.

```
DB_PROD_URI=mongodb://localhost:27017/node-restful-shop-prod
DB_DEV_URI=mongodb://localhost:27017/node-restful-shop-dev
DB_TEST_URI=mongodb://localhost:27017/node-restful-shop-test
```

For more details about MongoDB, click [here](https://www.mongodb.com/).

## 4. Setting environment file `.env`.

Simply copy `.env.simple` as `.env`, then edit it based on your need.

```
# App config
PROJECT_OWNER=%YOUR_NAME%
PROJECT_OWNER_EMAIL=%YOUR_EMAIL_ADDRESS%
HOST=127.0.0.1
PORT=3000

# Default DB URI
DB_PROD_URI=mongodb://localhost:27017/node-restful-shop-prod
DB_DEV_URI=mongodb://localhost:27017/node-restful-shop-dev
DB_TEST_URI=mongodb://localhost:27017/node-restful-shop-test

# Random sercet used for generating API accessToken
JWT_SECRET=%some_secrets%
JWT_EMAIL_SECRET=%some_secrets%

# Set it "true", an account activation link will be sent to user's email after sign up.
ENABLE_EMAIL_ADDRESS_VERIFICATION=false

# if "ENABLE_EMAIL_ADDRESS_VERIFICATION=true", you must provide details for setting up Email sender server.
SENDER_EMAIL_HOST=%SENDER_EMAIL_HOST%
SENDER_EMAIL_PORT=%SENDER_EMAIL_PORT%
SENDER_EMAIL_ID=%SENDER_EMAIL%
SENDER_EMAIL_PASSWORD=%SENDER_EMAIL_PASSWORD%

```

## Start project

```
npm start
```

## Test with APIs

Now, you are ready to play with APIs.
Just simply open your browser and access http://127.0.0.1:3000/api-docs.
