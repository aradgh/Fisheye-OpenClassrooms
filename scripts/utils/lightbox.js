// Éléments du DOM
const closeButtonLightbox = document.getElementById("close-lightbox-modal");
const lightbox = document.getElementById("lightbox");
const mediaPlaceholder = document.getElementById("lightbox_media");

function initLightbox(mediasData, photographer) {
  // Pourquoi je ne peux pas le mettre en variable globale ?
  const medias = document.querySelectorAll("figure");

  medias.forEach((media) => {
    media.addEventListener("click", () => {
      const mediaId = media.getAttribute("id");
      openLightbox(mediaId, mediasData, photographer);
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
    const img = document.createElement("img");
    img.setAttribute("src", srcImage);
    img.setAttribute("alt", "");
    img.setAttribute("class", "media__image");
    mediaPlaceholder.appendChild(img);
  }
  if (video != undefined) {
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
