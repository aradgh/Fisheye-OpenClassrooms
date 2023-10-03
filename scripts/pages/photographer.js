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

// Fonction d'initialisation
async function init() {
  // Avoir une var globale avec tous les photographers et l'appeler dans le init
  const photographer = await getPhotographer();
  const medias = await sortMedia("popularity", await getMedia());
  const { name } = photographer;

  await displayPhotographerData(photographer);
  await displayMedias(medias, name);

  lightbox();
}

init();
