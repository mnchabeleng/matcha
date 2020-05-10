'use strict'

const pageTitle = 'Matcha' 
document.title = pageTitle
const usersURL = 'http://localhost:3300/users/'
const notificationsURL = 'http://localhost:3300/notifications'
const likesURL = 'http://localhost:3300/likes/'

let page = 1
const limit = 9
let orderBy = ''
let gender = ''
let city = ''
let min = 18
let max = 100
let userInterest = ''

async function loadUsers(){
    getUsers()
}
loadUsers()

function getUsers(){    
    const queries = `page=${page}&limit=${limit}&orderby=${orderBy}&gender=${gender}&min=${min}&max=${max}&city=${city}&interest=${userInterest}`
    fetch(usersURL + '?' + queries,{
        headers: {'Authorization': 'Bearer ' + token}
    }).then(res => res.json()).then((data) => {
        if (data.length < 9)
            loadMore.style.display = 'none'
        else
            loadMore.style.display = 'block'
    
        displayUsers(data)
    })
}

function displayInterests(interests){
    const interestsEl = '< class="interests" ul>'

    JSON.parse(interests).forEach(function(i){
        interestsEl += '<li>'+ i.interest +'</li>'
    })

    interestsEl += '</ul>'

    return interestsEl
}

function displayImages(images){

}

async function displayUsers(usersList){
    const auth = await getAuthData()
    const usersElement = document.querySelector('.users')
    usersList.forEach(function(user){
        const cardElement = document.createElement('div')
        cardElement.setAttribute('class', 'card')
        cardElement.style.backgroundImage = `url(${user.image})`

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

        cardElement.appendChild(cardBodyElement)
        usersElement.appendChild(cardElement)

        cardElement.addEventListener('click', function(){
            if (auth.status === true){
                
                fetch(notificationsURL,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({type:'View', reciever:user.uname})
                })

                fetch(usersURL + user.id + '/views',{
                    method: 'POST',
                    headers: {'Authorization': 'Bearer ' + token}
                }).then(res => res.json()).then((data) => {
                    viewsCount = viewsCount + 1
                    viewsEl.innerHTML = `<img src="img/view.svg" height="30" width="30" alt="View" style="margin-bottom:-8px" /> ${viewsCount} views
                                        <img src="img/heart.svg" height="20" width="20" alt="View" style="margin-bottom:-5px" /> ${likesCount} likes`
                })

                document.getElementById("myModal").style.display = 'block'

                const modalContant = document.querySelector('.modal-container')
                modalContant.innerHTML = ''
    
                const profileImg = document.createElement('div')
                profileImg.setAttribute('class', 'profile-img')
                profileImg.style.backgroundImage = `url(${user.image})`
                modalContant.appendChild(profileImg)
    
                const interests = user.interests.split(',')
    
                const userInfo = document.createElement('div')
                userInfo.setAttribute('class', 'user-info')
                userInfo.innerHTML = `<h2>${user.uname} ~ ${getAge(user.dob)}</h2>
                                      <h3>${(user.gender == 'M')?'Male':'Female'}</h3>
                                      <p>${user.bio}</p>
                                      <h3>Interests</h3>`
                
                const interestsEl = document.createElement('ul')
                interestsEl.setAttribute('class', 'interests')
                interests.forEach(function(interest){
                    const interestEl = document.createElement('li')
                    interestEl.innerText = interest
                    interestsEl.appendChild(interestEl)
                    interestEl.addEventListener('click', function(e){
                        userInterest = interest
                        document.getElementById("myModal").style.display = 'none'
                        document.querySelector('.users').innerHTML = ''
                        getUsers()
                    })
                })
                userInfo.appendChild(interestsEl)
    
                const userImages = `${user.image1},${user.image2},${user.image3},${user.image4},${user.image5}`.split(',')
                const imagesTitle = document.createElement('h3')
                const imagesEl = document.createElement('ul')
                
                imagesTitle.innerText = 'Images'
                userInfo.appendChild(imagesTitle)
    
                imagesEl.setAttribute('class', 'images')
                userImages.forEach(function(image){
                    if(image != 'null'){
                        const imageEl = document.createElement('li')
                        imageEl.innerHTML = `<img src="${image}" width="100%">`
                        imagesEl.appendChild(imageEl)
                    }
                })
                userInfo.appendChild(imagesEl)
    
                modalContant.appendChild(userInfo)
            }
            else
                window.location = 'login.html'
        })

        if (auth.status === true)
        {
            const likeElement = document.createElement('div')
            likeElement.setAttribute('class', 'like')
            likeElement.innerHTML = `<img src="img/heart.svg" height="35" width="35" alt="Like" />`
            cardBodyElement.appendChild(likeElement)
            
            likeElement.addEventListener('click', function(e){
                e.stopPropagation()
                fetch(likesURL + user.uname,{
                    method: 'POST',
                    headers: {'Authorization': 'Bearer ' + token}
                })
                this.style.display = 'none'

                fetch(usersURL + user.id + '/likes',{
                    method: 'POST',
                    headers: {'Authorization': 'Bearer ' + token}
                }).then(res => res.json()).then((data) => {
                    likesCount = likesCount + 1
                    viewsEl.innerHTML = `<img src="img/view.svg" height="30" width="30" alt="View" style="margin-bottom:-8px" /> ${viewsCount} views
                                        <img src="img/heart.svg" height="20" width="20" alt="View" style="margin-bottom:-5px" /> ${likesCount} likes`
                })
            })
        }
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

const ageRangeSlider = $(".age-range-slider").asRange({
    step: 1,
    range: true,
    limit: true,
    min: 18,
    max: 100,
    onChange: function(value){
      min = value[0]
      max = value[1]
      return value
    }
});
ageRangeSlider.asRange('set', [18, 100])

let tempOrderBy = ''
let tempGender = ''
let tempCity = ''
let tempMin = 18
let tempMax = 100

const updateQuery = document.querySelector('.update-query')
updateQuery.innerText = 'Update Query'
updateQuery.addEventListener('click', function(){
    if (document.querySelector('#order').value)
        orderBy = document.querySelector('#order').value
    else
        orderBy = ''

    const male = document.querySelector('#male')
    const female = document.querySelector('#female')
    if (male.checked && !female.checked)
        gender = 'm'
    else if (!male.checked && female.checked)
        gender = 'f'
    else
        gender = ''

    if (document.querySelector('#location').value)
        city = document.querySelector('#location').value
    else
        city = ''

    if (orderBy != tempOrderBy || gender != tempGender || city != tempCity || min != tempMin || max != tempMax){
        tempOrderBy = orderBy
        tempGender = gender
        tempCity = city
        tempMin = min
        tempMax = max
        document.querySelector('.users').innerHTML = ''
        page = 1
        getUsers()
    }
})


// Load more users
const loadMore = document.querySelector('.load-more')
loadMore.innerText = 'Load More'
loadMore.addEventListener('click', function(){
    page++
    getUsers()
})