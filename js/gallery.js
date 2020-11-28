import galleryItems from './gallery-items.js';


const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxButton: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  };

galleryItems.forEach((element,index) => {

  const itemRef = document.createElement('li');
  const linkRef = document.createElement('a');
  const imgRef = document.createElement('img');

  linkRef.href = element.original;
  imgRef.src = element.preview;
  imgRef.alt = element.description;
    
  imgRef.setAttribute('data-index', index);
  imgRef.setAttribute('data-source', element.original);
  
  itemRef.classList.add("gallery__item");
  linkRef.classList.add("gallery__link");
  imgRef.classList.add("gallery__image");

  linkRef.appendChild(imgRef);
  itemRef.appendChild(linkRef);
  refs.gallery.append(itemRef);
  
});

refs.gallery.addEventListener('click', onGalleryClick);


function onGalleryClick(event) {
  event.preventDefault();

  refs.lightboxButton.addEventListener('click', onGalleryClose);
  refs.lightboxOverlay.addEventListener('click', onGalleryClose);
  window.addEventListener('keydown', onKeyPress);
  
  if (event.target.nodeName !== 'IMG') {
    return;
    }
    
  refs.lightbox.classList.add('is-open');
  refs.lightboxImage.src = event.target.dataset.source;
  refs.lightboxImage.setAttribute('data-index', (event.target.dataset.index));
    
};
  
function onGalleryClose() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxButton.removeEventListener('click', onGalleryClose);
  refs.lightboxOverlay.removeEventListener('click', onGalleryClose);
  window.removeEventListener('keydown', onKeyPress);
};

function onKeyPress(event) {
  if (event.code === 'Escape') {
    onGalleryClose()
  };
}

