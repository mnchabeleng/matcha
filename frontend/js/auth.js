'use strict'

const siteURL = 'http://127.0.0.1:5500'
const authURL = 'http://localhost:3300/auth'
const token = localStorage.getItem('token')

async function getAuthData(){
    const body = {
        token: token
    }
    const data = await fetch(authURL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
    return data
}

async function loadContent(){
    const auth = await getAuthData()
    
    if (token && auth.status === false)
        localStorage.removeItem('token')

    if (token && auth.status === true)
        document.querySelector('.login-to-display').style.display = 'block'
    else
        document.querySelector('.logout-to-display').style.display = 'block'
}
loadContent()