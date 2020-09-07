# Node-Restful-API-Swagger

## Abstract

This is A node.js based RESTful API project, with multiple functions like User Signup and Login, generate Api accessToken, create/update/get/delete products and orders.

## Knowledge Cover

-   Swagger & OpenApi 3.0
-   Node.js
-   Express.js
-   CORS
-   Restful API
-   MongoDB Atlas
-   Mongoose
-   JWT Authorization
-   OpenApi and swagger

## How to use

1. Clone Project into your local machine

    ```
    git clone https://github.com/LQF2020/node-restful-api-swagger.git
    ```

2. Go into project folder and install packages.

    ```
    cd node-restful-api-swagger
    npm install
    ```

3. Prepare your local mongoDB database, with a default port `27017`. Alternatively, you could go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to create a cloud database. Afterward, please follow Step 4 to link this app to your DB server.

4. Create Environment configuration file `.env` under your root directory, with the following content completed.

    ```
    PROJECT_OWNER=%YOUR_NAME%
    PROJECT_OWNER_EMAIL=%YOUR_EMAIL_ADDRESS%

    HOST=http://127.0.0.1
    PORT=3000

    // DB for prod / dev stage, e.g. mongodb://localhost:27017/<your-prod-DB-name>
    DB_PROD_URI=%YOUR_PRODUCTION_DB_URI%

    // DB for testing stage, e.g. mongodb://localhost:27017/<your-test-DB-name>
    DB_TEST_URI=%YOUR_TESTING_DB_URI%

    // A random string used for generating API accessToken
    JWT_SECRET=%some_secrets%

    // A random string used for generating email verification accessToken
    JWT_EMAIL_SECRET=%some_secrets%

    // if set to 'true', user will receive verification email when sign up a new account
    ENABLE_EMAIL_ADDRESS_VERIFICATION=false

    // if set "ENABLE_EMAIL_ADDRESS_VERIFICATION=true", please fill up the following to init Email Sender
    SENDER_EMAIL_HOST=%SENDER_EMAIL_HOST%
    SENDER_EMAIL_PORT=%SENDER_EMAIL_PORT%
    SENDER_EMAIL_ID=%SENDER_EMAIL%
    SENDER_EMAIL_PASSWORD=%SENDER_EMAIL_PASSWORD%

    ```

5. Start project

    ```
    npm start
    ```

6. Now, you are ready to play with the restful urls. Just simply open your browser and access http://127.0.0.1:3000/api-docs . If you would like different `HOST` and `PORT`, just change in `.env` file.

## Reference:

This project is created for self-learning purpose, inspired by [AcadeMind's RESTful Api with Node.js Course](https://www.youtube.com/watch?v=0oXYLzuucwE&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=1).
