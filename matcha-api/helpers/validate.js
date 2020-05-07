'use strict'
const userModel = require('../models/user')

const regex = {
    username:/^[a-zA-Z0-9_-]+$/,
    email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name:/^[a-zA-Z]+$/,
    password:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,1000}$/
}

exports.username = (username, messages) => {
    const reg = regex.username
    
    if (!username || username == '')
        return messages.required
    else if (!reg.test(username))
        return messages.invalid
    
    return false
}

exports.email = (email, messages) => {
    const reg = regex.email
    
    if (!email || email == '')
        return messages.required
    else if (!reg.test(email))
        return messages.invalid

    return false
}

exports.name = (name, messages) => {
    const reg = regex.name
    
    if (!name || name == '')
        return messages.required
    else if (!reg.test(name))
        return messages.invalid
    
    return false
}

exports.location = (locaction, messages) => {
    if(locaction.city && locaction.lat && locaction.lng)
        return false
    
    return messages.required
}

exports.password = (password, password_repeat, messages) => {
    const reg = regex.password

    if (!password || password == '')
        return messages.required
    else if (password != password_repeat && password_repeat)
        return messages.match
    else if (!reg.test(password))
        return messages.invalid
    
    return false
}

exports.password_repeat = (password, password_repeat, messages) => {
    const reg = regex.password
    
    if (!password_repeat || password_repeat == '')
        return messages.required
    else if (password != password_repeat && password)
        return messages.match
    else if (!reg.test(password_repeat))
        return messages.invalid
    
    return false
}

exports.gender = (gender, messages) => {
    const g = gender.toLowerCase()
    
    if (g == 'm' || g == 'f')
        return false
    
    return messages.invalid
}

exports.image = (image, messages) => {
    if(image == null)
        return messages.required
    else if(image.mimetype != 'image/png' && image.mimetype != 'image/jpg' && image.mimetype != 'image/jpeg')
        return messages.type
    else if(image.size > 1000000)
        return messages.size

    return false
}

exports.dob = (dob, messages) => {
    if(dob.day >= 1 && dob.day <= 31 && dob.month >= 1 && dob.month <= 12 && dob.year >= 1920 && dob.year <= 2002)
        return false
    else
        return messages.invalid
}

exports.bio = (bio, messages) => {
    if(!bio)
        return messages.required
    return false
}

exports.interests = (interests, messages) => {
    if(!interests)
        return messages.required
    return false
}

exports.capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}