'use strict'

const db = require('./connect')

exports.createUsersTabble = () => {
    return new Promise((resolve) => {
        const query = `CREATE TABLE IF NOT EXISTS users (
            id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            uname varchar(50) NOT NULL,
            email varchar(50) NOT NULL,
            fname varchar(50) NOT NULL,
            lname varchar(50) NOT NULL,
            bio text NOT NULL,
            dob date NOT NULL,
            gender varchar(50) NOT NULL,
            pass varchar(150) NOT NULL,
            image varchar(100) NOT NULL,
            lat decimal(10,8) DEFAULT NULL,
            lng decimal(11,8) DEFAULT NULL,
            city varchar(100) DEFAULT NULL,
            interests text NOT NULL,
            create_data timestamp NOT NULL DEFAULT current_timestamp(),
            modify_date timestamp NOT NULL DEFAULT current_timestamp(),
            image1 varchar(150) DEFAULT NULL,
            image2 varchar(150) DEFAULT NULL,
            image3 varchar(150) DEFAULT NULL,
            image4 varchar(150) DEFAULT NULL,
            image5 varchar(150) DEFAULT NULL,
            views int(11) NOT NULL DEFAULT 0,
            likes int(11) NOT NULL DEFAULT 0
          ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`

        db.query(query, (err) => {
            if (err) throw err.message;
            resolve('Users table created')
        })
    })
}

exports.createCitiesTable = () => {
    return new Promise((resolve) => {
        const query = `CREATE TABLE IF NOT EXISTS cities (
            id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            country varchar(100) NOT NULL,
            city varchar(100) NOT NULL,
            accent_city varchar(100) NOT NULL,
            province varchar(100) NOT NULL,
            lat decimal(10,8) NOT NULL,
            lng decimal(11,8) NOT NULL,
            province_id int(3) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`

        db.query(query, (err) => {
            if (err) throw err.message;
            resolve('Cities table created')
        })
    })
}

exports.createLikesTable = () => {
    return new Promise((resolve) => {
        const query = `CREATE TABLE IF NOT EXISTS likes (
            id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            sender tinytext NOT NULL,
            reciever tinytext NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`

        db.query(query, (err) => {
            if (err) throw err.message;
            resolve('Likes table created')
        })
    })
}

exports.createMessagesTable = () => {
    return new Promise((resolve) => {
        const query = `CREATE TABLE IF NOT EXISTS messages (
            id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            sender tinytext NOT NULL,
            reciever tinytext NOT NULL,
            message text DEFAULT NULL,
            create_date timestamp NOT NULL DEFAULT current_timestamp()
          ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`

        db.query(query, (err) => {
            if (err) throw err.message;
            resolve('Messages table created')
        })
    })
}

exports.createNotificationsTable = () => {
    return new Promise((resolve) => {
        const query = `CREATE TABLE IF NOT EXISTS notifications (
            id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            sender tinytext NOT NULL,
            reciever tinytext NOT NULL,
            type tinytext NOT NULL,
            description tinytext NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`

        db.query(query, (err) => {
            if (err) throw err.message;
            resolve('Notifications table created')
        })
    })
}