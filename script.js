let searchForm = document.querySelector('form');
let imageContainer = document.querySelector('.images-container');
let searchInput = document.querySelector('.search-input');
let loadMoreBtn = document.querySelector(".loadMoreBtn");

let accessKey = "ti2kDmRLym_ZJFd5tAZIQnzlS1rO7TVZ5AB2dybgUgs";

//Function to fetch image using unsplash API
let page = 1;
const fetchImages = async (query, pageNo) => {
    try {
        if (pageNo == 1) {
            imageContainer.innerHTML = '';
        }
    
        const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
        const response = await fetch(url);
        const data = await response.json();
    
        // console.log(data);
        if (data.results.length > 0) {
            data.results.forEach(photo => {
                // creating image div
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}">`;
    
                // creating overlay 
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');
    
                // creating overlay text
                const overlayText = document.createElement('h3');
                overlayText.innerText = `${photo.alt_description}`;
    
                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement);
    
                imageContainer.appendChild(imageElement);
            });
            if (data.total_pages === pageNo) {
                loadMoreBtn.style.display = "none";
            } else {
                loadMoreBtn.style.display = "block";
                // if(loadMoreBtn.style.display == "block"){
                //     loadMoreBtn.style.display = "none";
                // }
            }
        }else{
            imageContainer.innerHTML = `<h2>No image found.</h2>`;
        }
    } catch (error) {
        imageContainer.innerHTML = `<h2>failed to fetch images.</h2>`;
        if(loadMoreBtn.style.display == "block"){
            loadMoreBtn.style.display = "none";
        }
    }
    

}
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(searchInput.value);
    const inputText = searchInput.value.trim();
    if (inputText !== "") {
        page = 1;
        fetchImages(inputText, page);
    } else {
        imageContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
    }
})

loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
});