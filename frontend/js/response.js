function displayErrors(error){
    const response = document.querySelector('#response')
    response.innerHTML = ''
    const alert = document.createElement('div')
    alert.setAttribute('class', 'alert danger')
    alert.innerText = error
    response.appendChild(alert)

    const deleteResponse = document.createElement('div')
    deleteResponse.setAttribute('class', 'delete')
    deleteResponse.innerHTML = `<img src="img/delete.svg" height="25" width="25" alt="delete response">`
    alert.appendChild(deleteResponse)

    deleteResponse.addEventListener('click', function(){
        alert.style.display = 'none'
    })
}