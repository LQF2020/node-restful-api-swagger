# Node-Restful-API-Swagger

This is A node.js based RESTful CURD demo project, providing general functions like User Signup and Login, APIs Authorization , using RESTful apis to create/update/get/delete products and orders.

# Knowledge Cover

-   CURD Operation
-   SwaggerUI & OpenApi 3.0
-   Node.js
-   Express.js
-   CORS
-   Restful API
-   MongoDB & Mongoose
-   APIs Authorization (JWT)
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

## 3. Connecting to Database

### Default DB URIs are as follows:

Please make sure mongoDB Server service is installed and running on your localhost:27017.

```
DB_PROD_URI=mongodb://localhost:27017/node-restful-shop-prod
DB_DEV_URI=mongodb://localhost:27017/node-restful-shop-dev
DB_TEST_URI=mongodb://localhost:27017/node-restful-shop-test
```

> Alternatively, if you would like to connect DB remotely, just change DB URIs in `.env` file.

> For more details about MongoDB, click [here](https://www.mongodb.com/).

## 4. Setting environment file `.env`.

Simply copy `.env.sample` as `.env`, then edit it based on your need.

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

## 5. Start project

```
npm start
```

## 6. Play with APIs now !

Now, you are ready to test all APIs.
Just simply open your browser and access http://127.0.0.1:3000/api-docs.

# Docker

> #### Docker need to be installed in your OS. To install Docker, please click [here](https://docs.docker.com/get-docker/) .

> #### Please make sure you have followed Step 1 ~ Step 4 as above.

### Under the root path of project, start Docker service

```
docker-compose up
```

# APIs Authorization

## Some APIs are protected by accessToken (JWT), such as:

-   /products (POST)
-   /products/{productID} (PATCH)
-   /products/{productID} (DELETE)
-   /orders (POST)
-   /orders/{orderID} (PATCH)
-   /orders/{orderID} (DELETE)

## When calling these protected APIs, make sure you add %BearerToken% in `Authorization` request Header.

```
Authorization: Bearer <accessToken>
```

## How to get accessToken ?

When user login sucessfully, an unique accessToken will be returned.

# Available APIs

## User

| APIs         | Method |         Desc          |
| ------------ | :----: | :-------------------: |
| /user/signup |  POST  | Register user account |
| /user/login  |  POST  |      User Login       |

## Product

| APIs                  | Method | Desc                   | AccessToken |
| --------------------- | ------ | ---------------------- | ----------- |
| /products             | GET    | Get all products       |             |
| /products             | POST   | Create a new product   | Required    |
| /products/{productID} | GET    | Get a product by ID    |             |
| /products/{productID} | PATCH  | Update a product by ID | Required    |
| /products/{productID} | DELETE | Delete a product by ID | Required    |

## Order

| APIs              | Method | Desc                 | AccessToken |
| ----------------- | ------ | -------------------- | ----------- |
| /orders           | GET    | Get all orders       |             |
| /orders           | POST   | Create a new order   | Required    |
| /orders/{orderID} | GET    | Get a order by ID    |             |
| /orders/{orderID} | PATCH  | Update a order by ID | Required    |
| /orders/{orderID} | DELETE | Delete a order by ID | Required    |
