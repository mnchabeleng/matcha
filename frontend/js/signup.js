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
    const cities = await fetch(citiesURL).then(res => res.json())
    
    $("#location").autocomplete({
        source: cities.name
    })
    
    console.log(cities)
    signup()
}
loadSignup()

function signup(){
    const signupSubmit = document.querySelector('#submit')
    signupSubmit.addEventListener('click', function(){
        const day = document.querySelector('#day').value
        const month = document.querySelector('#month').value
        const year = document.querySelector('#year').value
    
        const username = document.querySelector('#username')
        const email = document.querySelector('#email')
        const firstName = document.querySelector('#first-name')
        const lastName = document.querySelector('#last-name')
        const gender = document.querySelector('#gender').value
        const dob = `${year}-${month}-${day}`
        const bio = document.querySelector('#bio')
        const password = document.querySelector('#password')
        const passwordRepeat = document.querySelector('#password-repeat')
    
        if (username.value && email.value && firstName.value && lastName.value && gender && dob && bio.value && password.value && passwordRepeat.value){
            console.log(username.value)
            console.log(email.value)
            console.log(firstName.value)
            console.log(lastName.value)
            console.log(gender)
            console.log(dob)
            console.log(bio.value)
            console.log(password.value)
            console.log(passwordRepeat.value)
        }
    })
}
