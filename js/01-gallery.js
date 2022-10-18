import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const refs = {
  gallery: document.querySelector(".gallery"),
};

const markup = galleryItems.reduce(
  (acc, { preview, original, description }) =>
    acc +
    `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`,
  ""
);

refs.gallery.insertAdjacentHTML("beforeend", markup);

refs.gallery.addEventListener("click", onGalleryClick);

function onGalleryClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `
    <img src="${evt.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onKeyPress);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", onKeyPress);
      },
    }
  );

  instance.show();

  function onKeyPress(evt) {
    if (evt.code !== "Escape") {
      return;
    }
    instance.close();
  }
}
