# Matcha
#### Dating site created using Javascript, Nodejs and Mysql

![Screenshot](https://raw.githubusercontent.com/mnchabeleng/matcha/master/screenshot.png)

## Before you run Matcha

### Configure environment variables(.env) ~ (inside ROOT_FOLDER/matcha-api)
- #### Rename ROOT_FOLDER/matcha-api/.env.default to ROOT_FOLDER/matcha-api/.env
- #### Make sure to name all variables inside /matcha-api/.env appropriately

### Create database and import data(500 users required for testing) ~ (inside ROOT_FOLDER/matcha-api)
- #### To create Mysql database, run -> npm run setup

### Run Matcha API ~ (inside ROOT_FOLDER/matcha-api)
- #### Install required node modules using command -> npm i
- #### To start server use command -> npm start

### Run Matcha fontend ~ (inside ROOT_FOLDER/matcha-frontend)
- #### Open ROOT_FOLDER/matcha-frontend/index.html using your browser (Testing was done using mostly mozila firefox and liveserver vscode extension)

### To login as any of the users in the database
- #### Email, Copy the email from the email database column
- #### Password, All user passwords are set to "password" by default
