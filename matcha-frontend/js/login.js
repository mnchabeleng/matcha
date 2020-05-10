'use strict'
document.title = 'Login'
const loginUrl = 'http://localhost:3300/login/'

async function loadLogin(){
    const auth = await getAuthData()
    if (auth.status === false)
        login()
    else
        window.location = 'dashboard.html'

}
loadLogin()

function login(){
    const loginSubmit = document.querySelector('#login')
    loginSubmit.addEventListener('submit', function(e){
        e.preventDefault()
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        if (email && password)
            verifyEmailAndPassword({email, password})
        else
            displayErrors({message:'Missing input(s)'})
    })
}

function verifyEmailAndPassword(body){
    fetch(loginUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(function(data){
        if (data.status === true)
        {
            localStorage.setItem('token', data.token)
            window.location = 'index.html'
        }
        else
        {
            localStorage.removeItem('token')
            displayErrors({message:data.error.message})
        }
    })
}