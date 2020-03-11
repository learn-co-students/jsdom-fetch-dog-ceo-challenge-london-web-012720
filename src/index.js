console.log("%c HI", "color: firebrick");
const imageContainer = document.querySelector("#dog-image-container");
const dogBreedsContainer = document.querySelector("#dog-breeds");
const breedDropdown = document.querySelector("#breed-dropdown");
const breeds = dogBreedsContainer.children;

document.addEventListener("DOMContentLoaded", e => {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(data => displayDogs(data.message));
});

document.addEventListener("DOMContentLoaded", e => {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(data => displayBreeds(data.message));
});

function displayDogs(data) {
  data.forEach(d => {
    const img = document.createElement("img");
    img.src = d;
    img.style.width = "20rem";
    imageContainer.append(img);
  });
}

function displayBreeds(data) {
  for (key in data) {
    const li = document.createElement("li");
    li.innerText = key;
    li.className = "dog-breed";
    dogBreedsContainer.append(li);
  }
}

dogBreedsContainer.addEventListener("click", e => {
  if (e.target.className == "dog-breed") {
    if (e.target.style.color == "red") {
      e.target.style.color = "black";
    } else {
      e.target.style.color = "red";
    }
  }
});

breedDropdown.addEventListener("change", e => {
  console.log(breeds[0].innerHTML);
  letter = breedDropdown.value;
  for (let i = 0; i < breeds.length; i++) {
    if (breeds[i].innerHTML[0] !== letter) {
      breeds[i].style.display = "none";
    } else {
      breeds[i].style.display = "list-item";
    }
  }
});
