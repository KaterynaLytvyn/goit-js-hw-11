import './css/styles.css';
import {renderGallery} from './renderGallery.js';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-aio-3.2.5.min.js"

const API_KEY = "26974006-daeb29fcab66c9b2b77884f92"
const PER_PAGE = 40;
let page_num = 1

const searchForm = document.querySelector('#search-form')
const galleryContainer = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')

searchForm.addEventListener('submit', onSubmit)
loadMoreBtn.addEventListener('click', onClick)

async function onSubmit(event) {
    event.preventDefault()
    loadMoreBtn.style.visibility = 'hidden'
    galleryContainer.innerHTML=''
    page_num = 1

    const response = await loadAndRenderPictures (searchForm.elements.searchQuery.value, page_num)

    if (response.hits.length == 0) {
        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`, {timeout: 4000})
    }
    else {
        Notiflix.Notify.info(`Hooray! We found ${response.totalHits} images.`, {timeout: 4000})
        if (response.totalHits > PER_PAGE) {
            loadMoreBtn.style.visibility = 'visible'
        }
    }
}

async function onClick() {
    page_num += 1;

    const response = await loadAndRenderPictures (searchForm.elements.searchQuery.value, page_num)

    if (page_num*PER_PAGE >= response.totalHits) {
        Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`, {timeout: 4000})
        loadMoreBtn.style.visibility = 'hidden'
    }
}

async function getPictures(searchQuery, page) {
    return await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`)
}

async function loadAndRenderPictures(searchQuery, pageNumberToLoad){

    const result = await getPictures(searchQuery, pageNumberToLoad);
    const response = await result.json();

    console.log('response:', response)
    renderGallery(galleryContainer, response.hits)

    return response

}
