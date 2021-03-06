function displayErrors(error){
    if(error.class == null)
        error.class = '#response'
    const response = document.querySelector(error.class)
    response.innerHTML = ''
    const alert = document.createElement('div')
    alert.setAttribute('class', 'alert danger')
    alert.innerText = error.message
    response.appendChild(alert)

    const deleteResponse = document.createElement('div')
    deleteResponse.setAttribute('class', 'delete')
    deleteResponse.innerHTML = `<img src="img/delete.svg" height="25" width="25" alt="delete response">`
    alert.appendChild(deleteResponse)

    deleteResponse.addEventListener('click', function(){
        alert.style.display = 'none'
    })
}

function displaySuccess(success){
    if(success.class == null)
        success.class = '#response'
    const response = document.querySelector(success.class)
    response.innerHTML = ''
    const alert = document.createElement('div')
    alert.setAttribute('class', 'alert success')
    alert.innerText = success.message
    response.appendChild(alert)

    const deleteResponse = document.createElement('div')
    deleteResponse.setAttribute('class', 'delete')
    deleteResponse.innerHTML = `<img src="img/delete.svg" height="25" width="25" alt="delete response">`
    alert.appendChild(deleteResponse)

    deleteResponse.addEventListener('click', function(){
        alert.style.display = 'none'
    })
}