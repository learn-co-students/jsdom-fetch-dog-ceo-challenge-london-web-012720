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

//SHOW DOG
const displayDog = breed => {
	console.log(breed);
	const dogsImgEl = document.getElementById("dog-image-container");
	dogsImgEl.innerHTML = "";
	const dogImage = document.createElement("img");
	dogImage.src = breed.message;

	dogsImgEl.append(dogImage);
};

//CHALLENGE 2
const fetchBreeds = () => {
	fetch(breedUrl)
		.then(resp => resp.json())
		.then(breedData => {
			const allBreeds = breedObjectToArray(breedData);
			renderBreeds(allBreeds);

			//DROPDOWN - CHALLENGE 4
			const initialisedArray = allBreeds.map(breed => breed.charAt(0)).sort()
			const uniqueArray = [...new Set(initialisedArray)];

			const breedDrops = document.querySelector("#breed-dropdown");

			breedDrops.querySelectorAll("option").forEach(el => el.remove());

			breedDrops.options[breedDrops.options.length] = new Option("all");
			for (index in uniqueArray) {
				breedDrops.options[breedDrops.options.length] = new Option(
					uniqueArray[index]
				);
			}
			// console.log("test"); //list is the same as BreedLi
			breedDrops.addEventListener("change", () => {
				const firstLetter = document.querySelector("#breed-dropdown").value;

				const breedsWithFirstLetter =
					firstLetter === "all"
						? allBreeds
						: allBreeds.filter(breed => breed[0] === firstLetter);

				renderBreeds(breedsWithFirstLetter);
			});
		});
};

const breedObjectToArray = breedData => {
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

	return allBreeds;
};

const renderBreeds = breeds => {
	const breedUl = document.querySelector("#dog-breeds");

	breedUl.innerText = "";

	breeds.forEach(breed => {
		const breedLi = document.createElement("li");
		breedLi.innerText = breed;
		breedUl.append(breedLi);

		//SHOW DOG - EXTRA CHALLENGE
		breedLi.addEventListener("click", () => {
			if (breed.trim().indexOf(" ") != -1) {
				const [subbreed, breeds] = breed.split(" ");
				fetch(`https://dog.ceo/api/breed/${breeds}/${subbreed}/images/random`)
					.then(resp => resp.json())
					.then(breed => displayDog(breed));
			} else {
				fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
					.then(resp => resp.json())
					.then(breed => displayDog(breed));
			}
			console.log(breed);
		});

		//CHALLENGE 3
		breedLi.addEventListener("click", () => {
			console.log(breedLi);
			const textColour = breedLi.style.color;

			if (textColour === "black") {
				breedLi.style.color = "yellow";
			} else {
				breedLi.style.color = "black";
			}
		});
	});
};

init();
fetchBreeds();
