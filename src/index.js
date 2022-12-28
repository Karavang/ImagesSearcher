// 1.Сделать чтобы по скроллу прогружались картинки дальше(по дефолту 20 картинок,сделать 1 дефолт а дальше по скроллу)
// 2.Раздел Пагинация в ДЗ
// 3.Заменить fetch и then на Axios и async/await и обернуть это в try/catch
// 4.Если успею,сделать Simplelightbox


import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
// import { galleryItems } from "./gallery-items.js";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';
// Ожидание окончания ввода и ключ
const API_KEY = '32188250-5588add6a92db6c3bf4a2a30f';
// Переменные
const refs={
  input:document.querySelector('.input'),
  gallery:document.querySelector('.gallery'),
  button:document.querySelector('.button'),
  img:document.querySelector('.search'),
};
// Слушатель на ввод
refs.button.addEventListener('click',  getContent);
let currentPage = 1;
let totalPages;
let isEverythingLoaded;
console.log(totalPages)
// Получение данных
function getContent(e,images){
e.preventDefault();
const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(refs.input.value)+`&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
fetch(URL).then(res=>{
  if(res.status !== 200){
    throw new Error(res.totalHits)
  }
  if(res.total===0){
    function errorFunc() {
        Notify.failure('Oops, there is no country with that name', {
          position: 'center-top',
        });
    }
  }
  return res.json();
}).then(({hits,total})=>{createImage(hits,total)});


// axios.get(URL).then(res=>res.data).then(({articles})=>render(articles)).catch(error=>console.log(error))
}

// Функция на создание карточек
const createImage = (hits,total) =>{
  totalPages = total/40;

  refs.gallery.innerHTML='';
  if(total!==0){ Notify.success(`Hooray! We found ${total} images.`, {
    position: 'center-top',
  });}
  if(total===0){ Notify.failure(`Sorry, there are no images matching your search query. Please try again.`, {
    position: 'center-top',
  });}
  hits.forEach(({downloads,likes,comments,views,tags,webformatURL,largeImageURL}) => {
    const card = `<div class="photo-card">
  <a href="${largeImageURL}">
<img src="${webformatURL}" alt="${tags}" class="gallery-image" loading="lazy" />
</a>
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
</div>`
refs.gallery.insertAdjacentHTML('beforeend',card )});


};
const lightbox = new SimpleLightbox(".gallery-image", {
  captionsData: "alt",
  captionDelay: 250,
});

// Подгрузка карточек(пока не работает,остановился на подключении функций и спросил у ментора)
window.addEventListener('load', async (e,images,hits,total) => {
  const articles = await getContent(e,images);
  const elements = createImage(hits,total);
  
  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', elements)
})



const throttled = throttle(async (e,images,articles)=>{
  
  if (isEverythingLoaded) return;

  const body = document.body, html = document.documentElement;
  const totalHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  const pixelsToBottom = totalHeight - window.innerHeight - window.scrollY;
  if (pixelsToBottom < 450) {
    currentPage += 1;
    isEverythingLoaded = currentPage >= totalPages
    
    const articles = await getContent(e,images);
    const elements = createImage(articles);

    refs.articles.insertAdjacentHTML('beforeend', elements)
  }
}, 500)

window.addEventListener('scroll', throttled );

























