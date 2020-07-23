'use strict'
document.title = 'Matcha Dashboard'

const matchURL = 'http://localhost:3300/matches/'
const messagesURL = 'http://localhost:3300/messages/'
const notificationsURL = 'http://localhost:3300/notifications/'

const topCol = document.querySelector('.top')
const usersCol = document.querySelector('.users-col')
const messagesCol = document.querySelector('.messages-col')
const notificationsCol = document.querySelector('.notifications-col')

topCol.innerHTML = `<h1>${document.title}</h1>`

let admin = ''
let reciever = undefined
async function loadDashboard(){
    const auth = await getAuthData()
    admin = auth.authData.username

    if (auth.status === true)
    {
        getUsers()
        getNotifications()
    }
    else
        window.location = 'login.html'
}
loadDashboard()

// Get users from API
function getUsers(){
    fetch(matchURL, {
        headers: {'Authorization': 'Bearer ' + token}
    }).then(res => res.json()).then((data) => {
        displayUsers(data)
    })
}

// Get Messages from API
function getMessages(){
    fetch(messagesURL + reciever, {
        headers: {'Authorization': 'Bearer ' + token}
    }).then(res => res.json()).then((data) => {
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
        userElement.innerText = user.uname
        usersElement.appendChild(userElement)

        userElement.addEventListener('click', function(){
            const users = document.querySelectorAll('.user')
            users.forEach(function(user){
                user.classList.remove('active')
            })
            this.classList.add('active')
            reciever = user.uname
            document.querySelector('.messages').innerHTML = ''
            document.querySelector('.message-form').innerHTML = ''
            getMessages()
        })
    })
    
    const searchUser = document.querySelector('#search-user')
    searchUser.addEventListener('input', function(){
        const searchQuery = this.value.toLowerCase()
        filterUsers(searchQuery)
    })
}

setInterval(() => {
    const messagesElement = document.querySelector('.messages')
    messagesElement.innerHTML = ''

    fetch(messagesURL + reciever, {
        headers: {'Authorization': 'Bearer ' + token}
    }).then(res => res.json()).then((messagesList) => {
        messagesList.forEach(function(message){
            const messageElement = document.createElement('div')
            messageElement.setAttribute('class', 'message')
            
            messageElement.innerHTML = `<p class="message-sender"><b>${(message.sender != admin)?message.sender:'You'}</b></p><p class="message-body">${message.message}</p>`
            messagesElement.appendChild(messageElement)

            messagesElement.scrollTop = messagesElement.scrollHeight
        })
    })

    document.querySelector('.notifications').innerHTML = ''
    getNotifications()

}, 5000)

// Display messages
function displayMessages(messagesList){
    const messagesElement = document.querySelector('.messages')
    messagesList.forEach(function(message){

        const messageElement = document.createElement('div')
        messageElement.setAttribute('class', 'message')
        
        messageElement.innerHTML = `<p class="message-sender"><b>${(message.sender != admin)?message.sender:'You'}</b></p><p class="message-body">${message.message}</p>`
        messagesElement.appendChild(messageElement)

        messagesElement.scrollTop = messagesElement.scrollHeight
    })

    const searchMessage = document.querySelector('#search-message')
    searchMessage.addEventListener('input', function(){
        const searchQuery = this.value.toLowerCase()
        filterMessages(searchQuery)
    })

    const messageForm = document.createElement('form')
    const messageInput = document.createElement('input')
    messageInput.type = 'text'
    const messageButton = document.createElement('button')
    messageButton.type = 'submit'
    messageButton.innerText = 'Send Message'
    messageForm.appendChild(messageInput)
    messageForm.appendChild(messageButton)
    document.querySelector('.message-form').appendChild(messageForm)

    messageInput.addEventListener('input', function(e){
        if(messageInput.value && reciever != undefined)
            this.classList.remove('danger-input')
    })

    messageForm.addEventListener('submit', function(e){
        e.preventDefault()
        if(messageInput.value && reciever != undefined){
            sendMessage(reciever, messageInput.value)
            messageForm.reset()
        }
        else
            messageInput.classList.add('danger-input')
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
function sendMessage(reciever, message){
    fetch(messagesURL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({reciever, message})      
    }).then(function(res){
        document.querySelector('.messages').innerHTML = ''
        document.querySelector('.message-form').innerHTML = ''
        getMessages()
    })
}