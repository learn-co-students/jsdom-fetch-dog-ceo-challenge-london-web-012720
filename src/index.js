console.log("%c HI", "color: firebrick");

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

const dogsImgEl = document.getElementById("dog-image-container");

const init = () => {
	fetch(imgUrl)
		.then(resp => resp.json())
		.then(dogs => renderDogs(dogs));
};

//CHALLENGE 1
const renderDogs = dogs => {
	const dogsImgEl = document.getElementById("dog-image-container");
	const images = dogs.message;

	images.forEach(image => {
		dogImage = document.createElement("img");
		dogImage.src = image;
	});
	dogsImgEl.append(dogImage);
};

//CHALLENGE 2
const fetchBreeds = () => {
	fetch(breedUrl)
		.then(resp => resp.json())
		.then(breedData => renderBreeds(breedData));
};

const renderBreeds = breedData => {
	const breedUl = document.querySelector("#dog-breeds");

	console.log(breedData);

	const breeds = Object.keys(breedData.message);

	const allBreeds = [];

	breeds.forEach(breed => {
		console.log(breedData.message[breed]);
		if (breedData.message[breed].length === 0) {
			allBreeds.push(breed);
		} else {
			breedData.message[breed].forEach(subbreed =>
				allBreeds.push(`${subbreed} ${breed}`)
			);

			// console.log(allBreeds)
		}
	});

	allBreeds.forEach(breed => {
		const breedLi = document.createElement("li");
		breedLi.innerText = breed;
		breedUl.append(breedLi);
    
    //CHALLENGE 3
        breedLi.addEventListener("click", () => {
        console.log(breedLi)
        const textColour = breedLi.style.color; 

        if (textColour === 'black') {
            breedLi.style.color = "yellow"
        } else {
            breedLi.style.color = "black"
        }


        })
    
    
    
    
    });

    
        
       
    
    
    

    //DROPDOWN - CHALLENGE 4
	const breedDrops = document.querySelector("#breed-dropdown");

	// console.log("test");
	breedDrops.addEventListener("change", () => {
		const value = document.querySelector("#breed-dropdown").value;
		const lists = document.querySelectorAll("li");
		lists.forEach(list => {
			list.style.display = "none";
			if (list.innerText[0] === value) {
				list.style.display = "block";
			}
		});
    });
    

   
};

init();
fetchBreeds();
