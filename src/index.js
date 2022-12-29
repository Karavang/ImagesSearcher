import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

const API_KEY = '32188250-5588add6a92db6c3bf4a2a30f';
let currentPage = 1;
let observerTarget = null;
let scoller = 1;
const refs = {
  input: document.querySelector('.input'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('.button'),
  img: document.querySelector('.search'),
};


const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

const observer = new IntersectionObserver(entries => {
  if (entries[0].intersectionRatio <= 0) return;
  onScrollHandler();
});

refs.button.addEventListener('click',  getContent);
// Получение данных
async function getContent(e){
e.preventDefault();
scoller = 1;
refs.gallery.innerHTML = '';
const query = refs.input.value.trim();
if (!query) return;

const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
try {
  refs.gallery.innerHTML='';
  const res = await axios.get(URL);
  const { hits, total } = res.data
  createImages(hits, total);
  if(hits.length === total){ 
    Notify.failure(`No more images to fetch.`, {
      position: 'center-top',
    });
    return;
  }

  observerTarget = refs.gallery.lastElementChild;
  if (observerTarget) observer.observe(observerTarget);
} catch (error) {
  console.log(error);
}
}

async function onScrollHandler() {
  observer.unobserve(observerTarget);
  currentPage += 1;
  const query = refs.input.value.trim();
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;

  try {
    const res = await axios.get(URL);
    const { hits, totalHits } = res.data;
    createImages(hits, totalHits);
    scrollSmootly();
    lightbox.refresh();

    if(hits.length < 40){ 
      Notify.failure(`No more images to fetch.`, {
        position: 'center-top',
      });
      return;
    }


    observerTarget = refs.gallery.lastElementChild;
    observer.observe(observerTarget);
  } catch (error) {
    console.log(error);
  }
}

function scrollSmootly() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}


function createImages (hits,total) {
  console.log(total);
  if(total!==0 && scoller===1){ 
    Notify.success(`Hooray! We found ${total} images.`, {
    position: 'center-top',
  })
  scoller=2;}
  if(total===0){ 
    Notify.failure(`Sorry, there are no images matching your search query. Please try again.`, {
    position: 'center-top',
  });
  return;
}
  const markup = hits.map(({downloads,likes,comments,views,tags,webformatURL,largeImageURL}) => {
    return `<div class="photo-card">
<a href="${largeImageURL}">
<img src="${webformatURL}" alt="${tags}" class="gallery-image" loading="lazy" />
<div class="info">
  <p class="info-item">${likes}
  <b>Likes</b>
  </p>
  <p class="info-item">${views}
  <b>Views</b>
  </p>
  <p class="info-item">${comments}
  <b>Comments</b>
  </p>
  <p class="info-item">${downloads}
  <b>Downloads</b>
  </p>
</div>
</a>
</div>`
}).join('');
refs.gallery.insertAdjacentHTML('beforeend', markup);
lightbox.refresh();
};























