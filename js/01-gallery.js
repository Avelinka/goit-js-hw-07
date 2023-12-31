import { galleryItems } from "./gallery-items.js";
// Change code below this line

const container = document.querySelector(".gallery");
const markup = createMarkup(galleryItems);

container.insertAdjacentHTML("beforeend", markup);
container.addEventListener("click", handlePhotoClick);

function createMarkup(arr) {
  return arr
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
        </a>
        </li>`;
    })
    .join("");
}

const instance = basicLightbox.create(
  `<img width="1280" height="auto" src="">`,
  {
    onShow: (instance) => {
      window.addEventListener("keydown", onEscKeyPress);
    },
    onClose: (instance) => {
      window.removeEventListener("keydown", onEscKeyPress);
    },
  }
);

function handlePhotoClick(event) {
  if (event.target === event.currentTarget) {
    return;
  }
  event.preventDefault();
  const datasetSource = event.target.dataset.source;
  instance.element().querySelector("img").src = datasetSource;
  instance.show();
}

function onEscKeyPress(event) {
  if (event.code !== "Escape") return;
  instance.close();
}
