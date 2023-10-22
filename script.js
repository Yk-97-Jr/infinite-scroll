const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
//Unsplash API
const initialCount = 5;
const apiKey = 'R99k74l82Zz7uWi8O6zU1bRK_eHUsaqcJnlvwr9jqEY';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;


function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function setAttribute(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement("a");
        setAttribute(item,{
            href: photo.links.html,
            target: "_blank",
        });
        const img = document.createElement("img");
        setAttribute(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
//get photos with fetch  
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
         photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

//On Load
getPhotos();