'use strict'

document.title = 'Matcha Dashboard'

const usersURL = 'data/users.json'
const messagesURL = 'data/messages.json'
//const notificationsURL = 'data/notifications.json'
const notificationsURL = 'http://localhost:3300/notifications/'
let messageUname = undefined

const topCol = document.querySelector('.top')
const col1 = document.querySelector('.col-1')
const col2 = document.querySelector('.col-2')
const col3 = document.querySelector('.col-3')

topCol.innerHTML = `<h1>${document.title}</h1>`

async function loadDashboard(){
    const auth = await getAuthData()
    const user = auth.authData

    if (auth.status === true)
    {
        getUsers()
        getMessages()
        getNotifications()
        sendMessage()
    }
    else
        window.location = siteURL + '/login.html'
}
loadDashboard()

// Get users from API
function getUsers(){
    fetch(usersURL).then(res => res.json()).then((data) => {
        displayUsers(data)
    })
}

// Get Messages from API
function getMessages(){
    fetch(messagesURL).then(res => res.json()).then((data) => {
        displayMessages(data)
    })
}

// Get notifications from API
function getNotifications(){
    fetch(notificationsURL,{
        headers: {'Authorization': 'Bearer ' + token}
    }).then(res => res.json()).then((data) => {
        displayNotifications(data)
    })
}

// Display users
function displayUsers(usersList){
    const usersElement = document.querySelector('.users')
    
    usersList.forEach(function(user){
        const userElement = document.createElement('div')
        userElement.setAttribute('class', 'user')
        userElement.innerText = user.username
        usersElement.appendChild(userElement)

        console.log(messageUname)
        console.log(user.username)
        if(messageUname == user.username)
            userElement.classList.add('active')

        userElement.addEventListener('click', function(){
            messageUname = user.username
            const users = document.querySelectorAll('.user')
            users.forEach(function(user){
                user.classList.remove('active')
            })
            this.classList.add('active')
            localStorage.setItem('messageUname', user.username)
            document.querySelector('.messages').style.display = 'block'
            document.querySelector('.message-form').style.display = 'block'
        })
    })
    
    const searchUser = document.querySelector('#search-user')
    searchUser.addEventListener('input', function(){
        const searchQuery = this.value.toLowerCase()
        filterUsers(searchQuery)
    })
}

// Display messages
function displayMessages(messagesList){
    const messagesElement = document.querySelector('.messages')
    messagesList.forEach(function(message){
        const messageElement = document.createElement('div')
        messageElement.setAttribute('class', 'message')
        
        const deleteMessage = document.createElement('div')
        deleteMessage.setAttribute('class', 'delete')
        deleteMessage.innerHTML = `<img src="img/delete.svg" height="25" width="25" alt="delete message">`
        
        messageElement.innerHTML = `<p class="message-sender"><b>hello</b></p><p class="message-body">${message.message}</p>`
        messageElement.appendChild(deleteMessage)
        messagesElement.appendChild(messageElement)

        deleteMessage.addEventListener('click', function(){
            messageElement.style.display = 'none'
        })
    })
    const searchMessage = document.querySelector('#search-message')
    searchMessage.addEventListener('input', function(){
        const searchQuery = this.value.toLowerCase()
        filterMessages(searchQuery)
    })
}

// Display notifications
function displayNotifications(notificationsList){
    const notificationsElement = document.querySelector('.notifications')
    notificationsList.forEach(function(notification){
        const notificationElement = document.createElement('div')
        
        const deleteNotification = document.createElement('div')
        deleteNotification.setAttribute('class', 'delete')
        deleteNotification.innerHTML = `<img src="img/delete.svg" height="25" width="25" alt="delete message">`
        
        notificationElement.innerHTML = `<p><b>${notification.type}</b>: ${notification.description}</p>`
        notificationElement.appendChild(deleteNotification)
        notificationsElement.appendChild(notificationElement)

        deleteNotification.addEventListener('click', function(){
            fetch(notificationsURL + notification.id,{
                method: 'DELETE',
                headers: {'Authorization': 'Bearer ' + token}
            })
            notificationElement.style.display = 'none'
        })
    })
}

function filterUsers(searchQuery = undefined){
    const users = document.querySelectorAll('.user')
    users.forEach(function(user){
        const username = user.innerText.toLowerCase()
        if (username.indexOf(searchQuery) > -1)
            user.style.display = 'block'
        else
            user.style.display = 'none'
    })
}

function filterMessages(searchQuery = undefined){
    const messages = document.querySelectorAll('.message')
    messages.forEach(function(message){
        const sender = message.querySelector('.message-sender').innerText.toLowerCase()
        const body = message.querySelector('.message-body').innerText.toLowerCase()
        if (sender.indexOf(searchQuery) > -1 || body.indexOf(searchQuery) > -1)
            message.style.display = 'block'
        else
            message.style.display = 'none'
    })
}

// Send message
function sendMessage(){
    const sendMessage = document.querySelector('#send-message')
    const message = document.querySelector('#message').value
    sendMessage.addEventListener('click', function(e){
        if(messageUname != undefined)
            console.log(message)
        else
            console.log('user not defined')
    })
}