# Matcha
#### Dating site created using Javascript, Nodejs and Mysql

## Before you run Matcha

### Create database and import data(500 users required for testing)
- #### Create Mysql database
- #### Import ROOT_FOLDER/database/matcha.sql to the database

### Configure environment variables(.env) ~ (inside ROOT_FOLDER/matcha-api)
- #### Rename ROOT_FOLDER/matcha-api/.env.default to ROOT_FOLDER/matcha-api/.env
- #### Make sure to name all variables inside /matcha-api/.env correctly

### Run Matcha API ~ (inside ROOT_FOLDER/matcha-api)
- #### Install required node modules using command -> npm i
- #### To start server use command -> npm start

### Run Matcha fontend ~ (inside ROOT_FOLDER/matcha-frontend)
- #### Open ROOT_FOLDER/matcha-frontend/index.html using your browser (Testing was done using mostly mozila firefox and liveserver vscode extension)

### To login as any of the users in the database
- #### Email, Copy the email from the email database column
- #### Password, All user passwords are set to "password" by default
