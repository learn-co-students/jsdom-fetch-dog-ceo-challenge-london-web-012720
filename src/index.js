document.addEventListener("DOMContentLoaded", () => {
    
    console.log('%c HI', 'color: firebrick')
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    let breedsArray = [];

    // fetches

    fetch( imgUrl ) 
      .then(response => response.json())
      .then(results => allImages(results));

    fetch(breedUrl)
      .then(response => response.json())
      .then(results => {
        breeds = Object.keys(results.message)
        breedList(breeds);
      });

    // functions 

    function allImages(images) {
      images.message.forEach(image => renderImage(image));
    }

    function renderImage(image) {
        const imagesContainer = document.querySelector('#dog-image-container');
        const newImage = document.createElement('img');
        newImage.src = image;
        imagesContainer.append(newImage);
      }

    function breedList(breeds) {
      breeds.forEach(breed => renderBreed(breed) )
    }

    function renderBreed(breed) {
        const breedsUl = document.querySelector("#dog-breeds")
        const breedLi = document.createElement("li");
        breedLi.style.cursor = "pointer";
        breedLi.innerText = breed;
        breedsUl.append(breedLi);
        breedsArray.push(breed)

        colourFont(breedLi);
    }

    function colourFont(breedLi) {
        breedLi.addEventListener("click", (e) => {
          const dog = e.toElement;
          dog.style.color = "red";
        })
    }

    const dropdown = document.querySelector("#breed-dropdown");
    dropdown.addEventListener('change', (e) => {
      filterBreedsByLetter(e.target.value);
    })

    function filterBreedsByLetter(dropdownLetter) {
      renderFilteredList(breedsArray.filter(breed => breed.startsWith(dropdownLetter)));
    };

    function renderFilteredList(filteredBreeds) {
      let ul = document.querySelector('#dog-breeds');
      clearElement(ul);
      filteredBreeds.forEach(breed => renderBreed(breed));
    }

    function clearElement(ele) {
      let child = ele.lastElementChild;
      while (child) {
        ele.removeChild(child);
        child = ele.lastElementChild;
      }
    }

  });
