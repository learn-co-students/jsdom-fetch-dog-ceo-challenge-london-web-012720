console.log('%c HI', 'color: firebrick')


function fetchDogs() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(info => renderDogs(info))
}

function renderDogs(json) {
    console.log(json)
    const dogImage = document.querySelector(("#dog-image-container"))
    json.message.forEach(image => {
        const img = document.createElement('img')
        img.src = image 
        dogImage.appendChild(img)
    });
}

function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json()
    .then(info => renderBreeds(info)))
}

function renderBreeds(json) {
    console.log(json)
    const dogBreed = document.querySelector("#dog-breeds")
    for (const breed in json.message) {
        const li = document.createElement('li')
        li.innerText = breed
        li.addEventListener("click", () => {
            li.style.color = "red"
        })
        dogBreed.appendChild(li)
    }
}



document.addEventListener("DOMContentLoaded", function() {
    fetchDogs()
    fetchBreeds()
})
