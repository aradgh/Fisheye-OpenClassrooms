//Mettre le code JavaScript lié à la page photographer.html

function getPhotographerId() {
  let currentURL = window.location.href;
  let url = new URL(currentURL);
  let search_params = new URLSearchParams(url.search);

  return search_params.get("id");
}

// Récupérer tous les photographes
async function getAllPhotographers() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;

  return photographers;
}

// Récupérer le photographe concerné
async function getPhotographer() {
  const photographers = await getAllPhotographers();
  let photographer;
  photographers.forEach((currentPhotographer) => {
    if (currentPhotographer.id == getPhotographerId()) {
      photographer = currentPhotographer;
    }
  });

  return photographer;
}

// Fonction permettant l'affichage des données concernant le photographe
async function displayPhotographerData(photographer) {
  const buttonContact = document.querySelector(".contact_button"); // On récupère le bonton de contact pour ouvrir la modal
  const photographerModel = photographerTemplate(photographer); // On récupère le template photographe
  const identityPhotographerDOM =
    photographerModel.getIdentityPhotographerDOM(); // On récupère le DOM identité
  const imgPhotographerDOM = photographerModel.getImgPhotographerDOM(); // On récupère le DOM Image

  buttonContact.before(identityPhotographerDOM); // On ajoute avant le bouton contact l'identité
  buttonContact.after(imgPhotographerDOM); // On ajoute après le bouton contact l'image
}

function lightbox() {
  // Éléments du DOM
  const figures = document.querySelectorAll("figure");

  figures.forEach((figure) => {
    figure.addEventListener("click", () => {
      console.log("ça marchheeeee");
    });
  });
}

//Variable globale pour calculer le nombre de likes
let totalLikes = 0;

async function getInitialTotalLikes() {
  const photographerMedias = await getMedia();
  let totalInitialLikes = 0;
  photographerMedias.forEach((photographerMedia) => {
    totalInitialLikes += photographerMedia.likes;
  });

  return totalInitialLikes;
}

// Affichage des likes dans l'encart en bas à droite
function displayTotalLikes(likes) {
  const globalLikesDisplayed = document.getElementById("nbLikes");
  globalLikesDisplayed.textContent = likes;
}

// Travailler qu'avec l'objet, faire les modifications dans l'objet et ensuite rafraîchir la page
// après je ne fais qu'afficher l'objet dans le DOM
// pour réduire le nombre de ligne de moitié
// d'abord à l'initialisation d'ajouter les event Listener
// d'avoir un objet qui contient tous les médias avec leur état
// un array de tous les médias
// l'objet est en mémoire, il n'y a plus qu'à l'afficher 
// imaginer qu'il n'y a pas d'affichage, penser au backend
// Séparer la data de l'affichage
// travailler qu'avec la data
// 
async function updateLikes(medias) {
  // Éléments du DOM
  const figcaptions = document.querySelectorAll("figcaption");

  // Initialisation du nombre total de likes
  totalLikes = await getInitialTotalLikes();
  displayTotalLikes(totalLikes);

  figcaptions.forEach((figcaption) => {
    const nbLikes = figcaption.querySelector(".nbLikes");
    // Obtenir l'id de l'élément parent de nbLikes
    const mediaId = figcaption.parentElement.id;

    // Rechercher l'objet media correspondant dans le JSON medias
    const currentMedia = medias.find((media) => media.id === parseInt(mediaId));

    const likeButtons = figcaption.querySelectorAll(
      ".media__figcaption__likeIco"
    );

    likeButtons.forEach((likeButton) => {
      likeButton.addEventListener("click", () => {
        if (!likeButton.classList.contains("notDisplay")) {
          if (likeButton.classList.contains("empty")) {
            currentMedia.likes++;
            nbLikes.textContent = currentMedia.likes;

            figcaption.querySelector(".empty").classList.add("notDisplay");
            figcaption.querySelector(".full").classList.remove("notDisplay");
            
            totalLikes++;
            displayTotalLikes(totalLikes);
          } else {
            currentMedia.likes--;
            nbLikes.textContent = currentMedia.likes;

            figcaption.querySelector(".empty").classList.remove("notDisplay");
            figcaption.querySelector(".full").classList.add("notDisplay");

            totalLikes--;
            displayTotalLikes(totalLikes);
          }
        }
      });
    });
  });
}

// Fonction d'initialisation
async function init() {
  // Avoir une var globale avec tous les photographers et l'appeler dans le init
  const photographer = await getPhotographer();
  const medias = await sortMedia("popularity", await getMedia());
  const { name } = photographer;

  await displayPhotographerData(photographer);
  await displayMedias(medias, name);

  // lightbox();

  updateLikes(medias);
}

init();
