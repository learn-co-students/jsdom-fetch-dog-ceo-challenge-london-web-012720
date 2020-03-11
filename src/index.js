const breedUrl = 'https://dog.ceo/api/breeds/list/all';

document.addEventListener("DOMContentLoaded",function() {
    let images = document.getElementById("dog-image-container");
    let ul = document.getElementById("dog-breeds");
    let dropDown = document.getElementById("breed-dropdown");
    let list;
    get_images();
    get_breeds();
    
    
    function get_images() {
        console.log('Gone to fetch')
        fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(resp => {
        console.log('Iḿ back')
        return resp.json()
      })
      .then(json => showImages(json))
        
        console.log('End of function')
    }

    function get_breeds() {
        return fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => showBreeds(json))
    }

    showImages = (data) => {
        innerHtml = "";
        for (let i = 0; i < data["message"].length; i++) {
            console.log(data["message"][i]);
            innerHtml += `<img src=${data["message"][i]} alt="Foto number ${i+1}">`;
        }
        images.innerHTML = innerHtml;    
    }

    showBreeds = (data) => {
        console.log(data);
        for (const breed in data["message"]) {
            li = document.createElement("li");
            let innerHtml = `${breed}`;
            li.innerText = innerHtml;
            ul.appendChild(li);
        }
        list = document.querySelectorAll("li");
        populate_list(list);
    }

    function populate_list(list){
        let counter = 0;
        for (let i = 0; i < list.length; i++) {
            list[i].addEventListener("click", function(e) {
                this.style.color = "#fff";
            })
        }
    }

    dropDown.addEventListener("change", function(e) {
        filter_results(e.target.value);
    })

    function filter_results(char){
        let new_list = [];
        ul.innerHTML = '';
        for (let i = 0; i < list.length; i++) {
            if (list[i].innerText[0] == char) ul.appendChild(list[i]);            
        }
    }

})