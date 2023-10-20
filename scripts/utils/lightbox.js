// Éléments du DOM
const closeButtonLightbox = document.getElementById("close-lightbox-modal");
const lightbox = document.getElementById("lightbox");
const mediaPlaceholder = document.getElementById("lightbox_media");
let medias = [];

// Une fonction doit avoir une fonctionnalité unique
// Créer une fonction qui va prendre la resp de chercher dans le DOM
// Medias doit être une liste d'objet,
// une fois que c'est un objet, on ne manipule plus le DOM mais l'objet en question
function initLightbox(mediasData, photographer) {
  // Init des medias après leur chargement
  medias = document.querySelectorAll("figure");

  console.log(medias);

  // On récupère la liste des ids des medias dans l'ordre où ils sont triés
  let mediaIdslist = Array.from(mediasData).map(function (media) {
    return media.id;
  });

  medias.forEach((media) => {
    media.addEventListener("click", () => {
      openLightbox(media.id, mediasData, photographer);
    });
  });

  closeLightbox();
}

function openLightbox(mediaId, mediasData, photographer) {
  lightbox.style.display = "flex";

  const mediaClicked = mediasData.find(
    (media) => media.id === parseInt(mediaId)
  );

  const { title, image, video } = mediaClicked; // On récupère les données du média

  const srcImage = `assets/images/${photographer.name}/${image}`; // On prépare le lien vers la photo
  const srcVideo = `assets/images/${photographer.name}/${video}`; // On prépare le lien vers la vidéo

  if (image != undefined) {
    // TODO : à mettre dans une fonction
    const img = document.createElement("img");
    img.setAttribute("src", srcImage);
    img.setAttribute("alt", "");
    img.setAttribute("class", "media__image");
    mediaPlaceholder.appendChild(img);
  }
  if (video != undefined) {
    // TODO : à mettre dans une fonction
    const video = document.createElement("video");
    const src = document.createElement("source");
    src.setAttribute("src", srcVideo);
    src.setAttribute("type", "video/mp4");
    video.setAttribute("class", "media__image");
    video.setAttribute("controls", "");
    video.setAttribute("autoplay", "");
    video.appendChild(src);
    mediaPlaceholder.appendChild(video);
  }
  // TODO : à mettre dans une fonction
  const h2 = document.createElement("h2");
  h2.textContent = title;
  mediaPlaceholder.appendChild(h2);
}

function closeLightbox() {
  closeButtonLightbox.addEventListener("click", () => {
    mediaPlaceholder.querySelectorAll("*").forEach((media) => media.remove());
    lightbox.style.display = "none";
  });
}
