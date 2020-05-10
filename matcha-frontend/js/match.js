'use strict'
const pageTitle = 'Your matches' 
document.title = pageTitle
const matchURL = 'http://localhost:3300/matches/'
const messagesURL = 'http://localhost:3300/messages/'
const blockUserURL = 'http://localhost:3300/likes/'

let page = 1
const limit = 9

async function loadUsers(){
    const auth = await getAuthData()

    if (auth.status === true)
        getUsers()
    else
        window.location = 'signup.html'
}
loadUsers()

function getUsers(){
    fetch(matchURL,{
        headers: {'Authorization': 'Bearer ' + token}
    }).then(res => res.json()).then((data) => {
        displayUsers(data)
    })
}

async function displayUsers(usersList){
    const auth = await getAuthData()
    const usersElement = document.querySelector('.users')
    usersList.forEach(function(user){
        const cardElement = document.createElement('div')
        cardElement.setAttribute('class', 'card')
        cardElement.style.backgroundImage = `url(${user.image})`
        
        const blockUserElement = document.createElement('div')
        blockUserElement.setAttribute('class', 'block-user')
        blockUserElement.innerHTML = `<img src="img/block.svg" height="40" width="40" alt="Like" />`

        const cardBodyElement = document.createElement('div')
        cardBodyElement.setAttribute('class', 'card-body')
        cardBodyElement.innerHTML = `<p>${user.gender}</p>
                                    <p>${user.uname} ~ ${getAge(user.dob)}</p>
                                    <p>${user.city}</p>`

        let viewsCount = user.views
        let likesCount = user.likes

        const viewsEl = document.createElement('p')
        viewsEl.innerHTML = `<img src="img/view.svg" height="30" width="30" alt="View" style="margin-bottom:-8px" /> ${viewsCount} views
                             <img src="img/heart.svg" height="20" width="20" alt="View" style="margin-bottom:-5px" /> ${likesCount} likes`
        cardBodyElement.appendChild(viewsEl)

        cardElement.appendChild(blockUserElement)
        cardElement.appendChild(cardBodyElement)
        usersElement.appendChild(cardElement)

        const messageElement = document.createElement('div')
        messageElement.setAttribute('class', 'like')
        messageElement.innerHTML = `<img src="img/chat.svg" height="35" width="35" alt="Like" />`
        cardBodyElement.appendChild(messageElement)

        blockUserElement.addEventListener('click', function(e){
            e.stopPropagation()
            document.getElementById("blockUserModal").style.display = "block";
            const modalContainer = document.querySelector('#blockUserModal .modal-container')
            modalContainer.innerHTML = ''
            const modalText = document.createElement('h4')
            modalText.innerText = 'Block ' + user.uname + '?'
            const blockButton = document.createElement('button')
            blockButton.innerText = 'Block'
            modalContainer.appendChild(modalText)
            modalContainer.appendChild(blockButton)

            blockButton.addEventListener('click', function(e){
                document.getElementById("blockUserModal").style.display = "none";
                cardElement.style.display = 'none'
                blockUser(user.uname)
            })
        })

        cardElement.addEventListener('click', function(){
            document.getElementById("messageModal").style.display = "block";
            document.querySelector('#response').innerHTML = ''
            const messageForm = document.querySelector('.message-form')
            messageForm.addEventListener('submit', function(e){
                e.preventDefault()
                const message = document.querySelector('#message').value
                if(message)
                {
                    sendMessage(user.uname, message)
                    this.reset()
                }
                else
                    displayErrors({message: 'Type a message for ' + user.uname + '.'})
            })
        })
    })
}

function sendMessage(reciever, message){
    fetch(messagesURL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({reciever, message})      
    }).then(function(res){
        return res.json()
    }).then(function(data){
        displaySuccess({message: data.message})
    })
}

function blockUser(reciever){
    fetch(blockUserURL + reciever, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }      
    }).then(function(res){
        return res.json()
    }).then(function(data){
        if(data.status == true)
            displaySuccess({message: data.message, class: '#block-response'})
    })
}

function getAge(dateString){
    const today = new Date()
    const birthDate = new Date(dateString)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        age--
    return age
}