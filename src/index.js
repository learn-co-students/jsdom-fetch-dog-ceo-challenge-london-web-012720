// console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    

    let allBreeds = []

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = "https://dog.ceo/api/breeds/list/all"


    const dogImgContainer = document.getElementById("dog-image-container")
    const dogBreedUl = document.getElementById("dog-breeds")
    const breedDropDown = document.getElementById("breed-dropdown")
 
            
                
     dogBreedUl.addEventListener("click" , function() {
                    if (imgList.style.color == 'red'){
                    imgList.style.color = 'black'
                    }
                    else {
                    imgList.style.color = 'red'
                    }
                    })
        
        
        
    
      

     
        fetch(imgUrl, {method: "GET"})
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((dogImgData)=> {
            dogImgData.message.forEach(function(imgUrl){
                dogImgContainer.innerHTML += `<img src="${imgUrl}">`
            })
            const dogImgString = dogImgData.message.map((imgUrl) => {
                return `<img src="${imgUrl}">`
            })
        })
        
     

       fetch(breedUrl, {method: "GET"})
       .then((resp) => resp.json())
       .then((breedData)=> {
           allBreeds = Object.keys(breedData.message)
           dogBreedUl.innerHTML = createDogList(allBreeds)
       })
    
     function createDogList(dogBreedArray){
         const dogLiStringArray = dogBreedArray.map(function(breed){
             return `<li>${breed}</li>`
         })
         return dogLiStringArray.join('')
     }

     breedDropDown.addEventListener("change", (event) => {
        const letter = event.target.value  
        const filterBreeds = allBreeds.filter((breed) => breed.startsWith(letter))
        dogBreedUl.innerHTML = createDogList(filterBreeds)
    })


})

