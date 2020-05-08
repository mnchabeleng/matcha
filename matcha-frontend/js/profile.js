'use strict'
const userURL = 'http://localhost:3300/profile/'
const citiesURL = 'http://localhost:3300/cities/'

const updateLocationURL = 'http://localhost:3300/profile/location/'
const updateInterestsURL = 'http://localhost:3300/profile/interests/'
const updateBioURL = 'http://localhost:3300/profile/bio/'
const updatePasswordURL = 'http://localhost:3300/profile/password/'
const updateImagesURL = 'http://localhost:3300/profile/images/'

async function loadProfile(){
    const auth = await getAuthData()
    if (auth.status === true)
        getUserData(auth.authData.id)
    else
        window.location = 'signup.html'
}
loadProfile()

function getUserData(id){
    fetch(userURL + id,{
        headers: {'Authorization': 'Bearer ' + token}
    }).then(res => res.json()).then((data) => {
        displayUserData(data)
    })
}

function displayUserData(user){
    handleProfileImg(user)
    handleInfo(user)
    handleLocation(user)
    handleInterests(user)
    handleBio(user)
    handlePassword()
    handleImages(user)
}

function handleProfileImg(user){
    const profileImg = document.querySelector('.profile-img')
    profileImg.style.backgroundImage = `url(${user.image})`
}

function handleInfo(user){
    const username = document.querySelector('#username')
    const firstName = document.querySelector('#first-name')
    const lastName = document.querySelector('#last-name')
    const email = document.querySelector('#email')
    const gender = document.querySelector('#gender')
    const dob = document.querySelector('#dob')

    username.innerText = user.uname
    firstName.innerText = user.fname
    lastName.innerText = user.lname
    email.innerText = user.email
    gender.innerText = user.gender
    dob.innerText = user.dob.split('T')[0]
}

function handleLocation(user){
    const locationForm = document.querySelector('#location-form')
    const userLocation = document.querySelector('#location')
    const lat = document.querySelector('#lat')
    const lng = document.querySelector('#lng')

    userLocation.addEventListener('input', function(){
        suggestions.appendChild(cityList)
        cityList.innerHTML = ''
        searchCities(this.value)
    })

    userLocation.value = user.city
    lat.value = user.lat
    lng.value = user.lng

    locationForm.addEventListener('submit', function(e){
        e.preventDefault()
        fetch(updateLocationURL, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({location:userLocation.value, lat: lat.value, lng: lng.value})    
        }).then(function(res){
                return res.json()
        }).then(function(data){
            if(data.status == false && data.validation == true)
                displayErrors({message: data.message.location, class: '#location-response'})
            else if(data.status == true)
                displaySuccess({message: data.message, class: '#location-response'})
        })
    })
}

const suggestions = document.querySelector('.suggestion-list')
const cityList = document.createElement('ul')

async function searchCities(searchQuery){
    const location = document.querySelector('#location')
    const lat = document.querySelector('#lat')
    const lng = document.querySelector('#lng')

    lat.value = ''
    lng.value = ''
    const cities = await fetch(citiesURL + `?q=${encodeURIComponent(searchQuery)}`).then(res => res.json())
    
    let matches = cities.filter(function(city){
        const regex = new RegExp(`^${searchQuery}`, 'gi')
        return city.city.match(regex)
    })
    
    if(!searchQuery){
        suggestions.innerHTML = ''
        matches = []
    }

    if(matches.length > 0){
        matches.forEach(function(match){
            const listEl = document.createElement('li')
            listEl.innerHTML = `<li><h4>${match.country}, ${match.accent_city}</li>`
            cityList.appendChild(listEl)

            listEl.addEventListener('click', function(){
                suggestions.innerHTML = ''
                location.value = `${match.country}, ${match.accent_city}`
                lat.value = match.lat
                lng.value = match.lng
            })
        })
    }
}

function handleInterests(user){
    const interestsForm = document.querySelector('#interests-form')
    const interests = document.querySelector('#interests')
    interests.value = user.interests
    $('input[name="interests"]').amsifySuggestags({type : 'amsify'})

    interestsForm.addEventListener('submit', function(e){
        e.preventDefault()
        fetch(updateInterestsURL, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({interests:interests.value})    
        }).then(function(res){
                return res.json()
        }).then(function(data){
            if(data.status == false && data.validation == true)
                displayErrors({message: data.message.interests, class: '#interests-reponse'})
            else if(data.status == true)
                displaySuccess({message: data.message, class: '#interests-reponse'})
        })
    })
}

function handleBio(user){
    const bioForm = document.querySelector('#bio-form')
    const bio = document.querySelector('#bio')

    bio.value = user.bio

    bioForm.addEventListener('submit', function(e){
        e.preventDefault()
        fetch(updateBioURL, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bio:bio.value})    
        }).then(function(res){
                return res.json()
        }).then(function(data){
            if(data.status == false && data.validation == true)
                displayErrors({message: data.message.bio, class: '#bio-response'})
            else if(data.status == true)
                displaySuccess({message: data.message, class: '#bio-response'})
        })
    })
}

function handlePassword(){
    const passwordForm = document.querySelector('#password-form')
    const passwordOld = document.querySelector('#password-old')
    const password = document.querySelector('#password')
    const passwordRepeat = document.querySelector('#password-repeat')

    passwordForm.addEventListener('submit', function(e){
        e.preventDefault()
        fetch(updatePasswordURL, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password_old:passwordOld.value, password:password.value, password_repeat:passwordRepeat.value})    
        }).then(function(res){
                return res.json()
        }).then(function(data){
            if(data.status == false && data.validation == true){
                validatePassword(data.message)
            }else if(data.status == false){
                clearPasswordErrors()
                displayErrors({message: data.message, class: '#password-response'})
            }else if(data.status == true){
                passwordForm.reset()
                clearPasswordErrors()
                displaySuccess({message: data.message, class: '#password-response'})
            }
        })
    })
}

function clearPasswordErrors(){
    const passwordErrors = document.querySelectorAll('.error')
    passwordErrors.forEach(function(errorEl){
        errorEl.innerText = ''
    })
}

function validatePassword(validation){
    const passwordOld = document.querySelector('.password-old .error')
    const password = document.querySelector('.password .error')
    const passwordRepeat = document.querySelector('.password-repeat .error')

    if(validation.password_old)
        passwordOld.innerText = validation.password_old
    else
        passwordOld.innerText = ''

    if(validation.password)
        password.innerText = validation.password
    else
        password.innerText = ''

    if(validation.password_repeat)
        passwordRepeat.innerText = validation.password_repeat
    else
        passwordRepeat.innerText = ''
}

const imagesForms = document.querySelector('.images-forms')
const imagesEl = document.querySelector('ul.images')

function imageForm(id){
    const imageForm = document.createElement('form')
    const imageInput = document.createElement('input')
    imageInput.type = 'file'
    imageInput.name = 'image'
    const imageButton = document.createElement('button')
    imageButton.type = 'submit'
    imageButton.innerText = 'Upload image'

    const errorEl = document.createElement('div')
    errorEl.setAttribute('class', 'error')
    errorEl.innerText = ''

    imageForm.appendChild(imageInput)
    imageForm.appendChild(imageButton)
    imagesForms.appendChild(imageForm)
    imagesForms.appendChild(errorEl)

    imageForm.addEventListener('submit', function(e){
        e.preventDefault()
        fetch(updateImagesURL + id,{
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: new FormData(this)
        }).then(function(res){
            return res.json()
        }).then(function(data){
            if(data.status == false && data.validation == true){
                errorEl.innerText = data.messages.image
            }
            else if(data.status == true){
                errorEl.innerText = ''
                displaySuccess({message: data.message, class: '#images-response'})
                imageForm.reset()
                imageForm.style.display = 'none'
                const imageEl = document.createElement('li')
                imageEl.innerHTML = `<img src="${data.image}" width="100%">`
                imagesEl.appendChild(imageEl)
            }
        })
    })
}

function handleImage1(){
    imageForm(1)
}

function handleImage2(){
    imageForm(2)
}

function handleImage3(){
    imageForm(3)
}

function handleImage4(){
    imageForm(4)
}

function handleImage5(){
    imageForm(5)
}

function handleImages(user){
    if(!user.image1)
        handleImage1()
    if(!user.image2)
        handleImage2()
    if(!user.image3)    
        handleImage3()
    if(!user.image4)
        handleImage4()
    if(!user.image5)
        handleImage5()
    
    const userImages = `${user.image1},${user.image2},${user.image3},${user.image4},${user.image5}`.split(',')

    userImages.forEach(function(image){
        if(image != 'null'){
            const imageEl = document.createElement('li')
            imageEl.innerHTML = `<img src="${image}" width="100%">`
            imagesEl.appendChild(imageEl)
        }
    })
}