import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Ожидание окончания ввода
const DEBOUNCE_DELAY = 300;
// Переменные
const refs={
  input:document.querySelector('.input'),
  gallery:document.querySelector('.gallery'),
};
// Слушатель на ввод
refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
// Из 7 работы галерея
const galleryItemMarkup = creatGalleryMarkup(galleryItems);
galleryItem.insertAdjacentHTML("beforeend", galleryItemMarkup);

function creatGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li>
         <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
       </li>`;
    })
    .join("");
}
const lightbox = new SimpleLightbox(".gallery__item", {
  captionsData: "alt",
  captionDelay: 250,
});
	
// Пример с сайта библиотеки
var API_KEY = '32188250-5588add6a92db6c3bf4a2a30f';
var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
$.getJSON(URL, function(data){
if (parseInt(data.totalHits) > 0)
    $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
else
    console.log('No hits');
});

// Карточка
function createImage(images) {
  return images.map((image) => `<div class="photo-card">
  <a href="${image.largeImageURL}">
<img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" loading="lazy" />
</a>
<div class="info">
  <p class="info-item">${image.likes}
  <b>Likes</b>
  </p>
  <p class="info-item">${image.views}
  <b>Views</b>
  </p>
  <p class="info-item">${image.comments}
  <b>Comments</b>
  </p>
  <p class="info-item">${image.downloads}
  <b>Downloads</b>
  </p>
</div>
</div>`).join('');
};