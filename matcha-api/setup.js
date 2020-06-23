'use strict'

const createDB = require('./db/createDB')

async function createDatabaseTable(){
    
    // create database
    await createDB.createDatabase().then(res => console.log(res))
    
    // create database tables
    const createTable = require('./db/createTables')
    const insertData = require('./db/insertData')
    
    await createTable.createUsersTabble().then((res) => {
        console.log(res)
        insertData.users()
    })
    
    await createTable.createCitiesTable().then((res) => {
        console.log(res)
        insertData.cities()
    })
    
    await createTable.createLikesTable().then((res) => {
        console.log(res)
        insertData.likes()
    })
    
    await createTable.createMessagesTable().then((res) => {
        console.log(res)
        insertData.messages()
    })
    
    await createTable.createNotificationsTable().then((res) => {
        console.log(res)
        insertData.notifications()
    })

    process.exit()
}

createDatabaseTable()