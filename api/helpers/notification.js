'use strict'
const notificationModal = require('../models/notification')

module.exports = (type, sender, reciever) => {
    return new Promise((resolve, reject) => {
        type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
        let description = ''

        if(type == 'View')
            description = `${ sender } viewed your profile.`
        if(type == 'Like')
            description = `${ sender } liked your profile.`
        if(type == 'Message')
            description = `${ sender } sent you a message.`
        
        const data = {
            sender: sender,
            type: type,
            description: description,
            reciever: reciever
        }
        
        notificationModal.createNotification(data, (result) => {
            resolve({status: true})
        })

    })
}