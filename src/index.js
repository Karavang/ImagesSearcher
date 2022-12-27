import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import SimpleLightbox from "simplelightbox";
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


// Пример с сайта библиотеки
function getContent(e,images){
e.preventDefault();
const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(refs.input.value)+"&image_type=photo&orientation=horizontal&safesearch=true";
fetch(URL).then(res=>{
  if(res.status !== 200){
    throw new Error(res.totalHits)
  }

  return res.json();
}).then(({hits})=>{createImage(hits)});


// axios.get(URL).then(res=>res.data).then(({articles})=>render(articles)).catch(error=>console.log(error))
}

function createImage(hits) {
  refs.gallery.innerHTML='';
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
const lightbox = new SimpleLightbox(".photo-card", {
  captionsData: "alt",
  captionDelay: 250,
});



// Из 7 работы галерея
// const galleryItemMarkup = creatGalleryMarkup(galleryItems);
// galleryItem.insertAdjacentHTML("beforeend", galleryItemMarkup);

// function creatGalleryMarkup(galleryItems) {
//   return galleryItems
//     .map(({ preview, original, description }) => {
//       return `<li>
//          <a class="gallery__item" href="${original}">
//   <img class="gallery__image" src="${preview}" alt="${description}" />
// </a>
//        </li>`;
//     })
//     .join("");
// }
// const lightbox = new SimpleLightbox(".gallery__item", {
//   captionsData: "alt",
//   captionDelay: 250,
// });
	