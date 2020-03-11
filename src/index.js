document.addEventListener("DOMContentLoaded", () => {
  const get_images = (url, rpEvent) => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => rpEvent(data));
  };

  const pageRenderImage = data => {
    const imgTag = document.querySelector("#dog-image-container");
    const images = data.message;
    images.forEach(image => {
      const img = document.createElement("img");
      img.src = image;
      imgTag.appendChild(img);
    });
  };

  const pageRender = data => {
    const breeds = data.message;
    for (const breed in breeds) {
      if (breeds[breed].length > 0) {
        breeds[breed].forEach(IB => {
          addBreed(IB + " " + breed);
        });
      } else {
        addBreed(breed);
      }
    }
  };

  function addBreed(breed_name) {
    const breedTag = document.querySelector("#dog-breeds");
    const brd = document.createElement("li");
    brd.innerText = breed_name;
    breedTag.appendChild(brd);
    brd.addEventListener("click", function() {
      toggleColor(brd);
    });
  }

  function toggleColor(brd) {
    if (brd.style.color == "red") {
      brd.style.color = "black";
    } else {
      brd.style.color = "red";
    }
  }

  const brdDD = document.querySelector("#breed-dropdown");

  get_images("https://dog.ceo/api/breeds/image/random/4", pageRenderImage);
  get_images("https://dog.ceo/api/breeds/list/all", pageRender);

  brdDD.addEventListener("change", function() {
    const value = document.querySelector("#breed-dropdown").value;
    const li = document.querySelectorAll("li");
    li.forEach(list => {
      list.style.display = "none";
      if (list.innerText[0] === value) {
        list.style.display = "list-item";
      }
    });
  });
});
