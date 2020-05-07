'use strict'
document.title = 'Signup'
const citiesURL = 'data/cities.json'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const selectDay = document.querySelector('#day')
const selectMonth = document.querySelector('#month')
const selectYear = document.querySelector('#year')
months.forEach(function(month, index){
    const monthOption = document.createElement('option')
    const num = index + 1
    monthOption.value = (num < 10)?'0' + num:num
    monthOption.textContent = month
    selectMonth.appendChild(monthOption)
})

for(let i = 1; i <= 31; i++)
{
    const dayOption = document.createElement('option')
    dayOption.value = (i < 10)?'0' + i:i
    dayOption.textContent = dayOption.value
    selectDay.appendChild(dayOption)
}

for(let i = 2002; i >= 1920; i--)
{
    const yearOption = document.createElement('option')
    yearOption.value = i
    yearOption.textContent = i
    selectYear.appendChild(yearOption)
}

async function loadSignup(){
    const auth = await getAuthData()

    if (auth.status === false){
        $('input[name="interests"]').amsifySuggestags({type : 'amsify'})
        signup()

        document.querySelector('#location').addEventListener('input', function(){
            suggestions.appendChild(cityList)
            cityList.innerHTML = ''
            searchCities(this.value)
        })
    }
    else
        window.location = siteURL + '/profile.html'
}
loadSignup()

const suggestions = document.querySelector('.suggestion-list')
const cityList = document.createElement('ul')

async function searchCities(searchQuery){
    const location = document.querySelector('#location')
    const lat = document.querySelector('#lat')
    const lng = document.querySelector('#lng')

    const cities = await fetch(citiesURL).then(res => res.json())
    
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

const signupURL = 'localhost:3300/signup/'
function signup(){
    const signupForm = document.querySelector('.signup-form')
    signupForm.addEventListener('submit', function(e){
        e.preventDefault()
        fetch('http://localhost:3300/signup/',{
            method: 'POST',
            body: new FormData(this)
        }).then(function(res){
            return res.json()
        }).then(function(data){
            if(data.status == false && data.validation == true){
                validate(data.messages)
            }else if(data.status == true){
                clearFormErrors()
                displaySuccess({message:data.message,class:'#signup-response'})
            }
            //signupForm.reset()
        })
    })
}

function clearFormErrors(){
    const errors = document.querySelectorAll('.error')
    errors.forEach(function(errorEl){
        errorEl.innerText = ''
    })
}

function validate(validation){
    const uname = document.querySelector('.username .error')
    const email = document.querySelector('.email .error')
    const fname = document.querySelector('.first-name .error')
    const lname = document.querySelector('.last-name .error')
    const location = document.querySelector('.location .error')
    const gender = document.querySelector('.gender .error')
    const dob = document.querySelector('.dob .error')
    const image = document.querySelector('.image .error')
    const interests = document.querySelector('.interests .error')
    const bio = document.querySelector('.bio .error')
    const password = document.querySelector('.password .error')
    const passwordRepeat = document.querySelector('.password-repeat .error')

    if(validation.username != false)
        uname.innerText = validation.username
    else
    uname.innerText = ''

    if(validation.email != false)
        email.innerText = validation.email
    else
        email.innerText = ''

    if(validation.first_name != false)
        fname.innerText = validation.first_name
    else
        fname.innerText = ''

    if(validation.last_name != false)
        lname.innerText = validation.last_name
    else
        lname.innerText = ''

    if(validation.location != false)
        location.innerText = validation.location
    else
        location.innerText = ''

    if(validation.gender != false)
        gender.innerText = validation.gender
    else
        gender.innerText = ''

    if(validation.dob != false)
        dob.innerText = validation.dob
    else
        dob.innerText = ''

    if(validation.image != false)
        image.innerText = validation.image
    else
        image.innerText = ''

    if(validation.interests != false)
        interests.innerText = validation.interests
    else
        interests.innerText = ''

    if(validation.bio != false)
        bio.innerText = validation.bio
    else
        bio.innerText = ''

    if(validation.password != false)
        password.innerText = validation.password
    else
        password.innerText = ''

    if(validation.password_repeat != false)
        passwordRepeat.innerText = validation.password_repeat
    else
        passwordRepeat.innerText = ''
}
