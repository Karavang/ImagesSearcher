const refs = {
    input: document.querySelector('.input'),
    gallery: document.querySelector('.gallery'),
    button: document.querySelector('.button'),
    img: document.querySelector('.search'),
  };
export default class getContent{
    async function getContent(e){
    e.preventDefault();
    scoller = 1;
    scoreError = 1;
    refs.gallery.innerHTML = '';
    const query = refs.input.value.trim();
    if (!query) return;
    
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
    try {
      refs.gallery.innerHTML='';
      const res = await axios.get(URL);
      const { hits, total } = res.data
      createImages(hits, total);
      if(hits.length === total&& scoreError===1){ 
        Notify.failure(`No more images to fetch.`, {
          position: 'center-top',
        });
        scoreError=2;
        return;
      }
    
      observerTarget = refs.gallery.lastElementChild;
      if (observerTarget) observer.observe(observerTarget);
    } catch (error) {
      console.log(error);
    }
    }} 
