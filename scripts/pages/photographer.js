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

// Fonction permettant l'affichage des médias du photographe
async function displayMedias(medias, name) {
  const section = document.querySelector(".medias");
  let i = 0;
  medias.forEach((media) => {
    const mediaModel = mediaTemplate(media, name);
    const getMediasDOM = mediaModel.getMediasDOM(i);
    section.appendChild(getMediasDOM);
    i++;
  });
}

// à revoir, plus optimisé avec des variables
// Fonction permettant de changer l'option affiché
function changeOption(span) {
  const options = document.querySelector(".options");
  const selected = document.querySelector(".selected");

  span.classList.remove("option");
  span.classList.add("option--current");
  span.classList.add("selected");
  span.setAttribute("aria-selected", "true");
  options.before(span);

  options.appendChild(selected);
  selected.classList.add("option");
  selected.classList.remove("option--current");
  selected.classList.remove("selected");
  selected.setAttribute("aria-selected", "false");
}

// Fonction permettant d'écouter le click sur une option du select et de réafficher les médias triés
// Clean code, comprendre tout de suite ce que fait mon code. Utiliser des fonctions pour chaque if
// Ne pas mettre toute la logique dans des if else
// Peut importe le nombre de fonctions, Eviter les mega-fonctions, pas trop longue, max 20 lignes
async function eventOption(medias, name) {
    //à changer, ne pas aller chercher l'info dans le DOM
  const span = document.querySelectorAll(".span"); // On récupère toutes les span
  span.forEach((span) => {
    span.addEventListener("click", async (e) => {
      e.preventDefault();
      if (span.getAttribute("id") === "popularity") {
        // Si la span contient l'id popularity
        if (!span.classList.contains("selected")) {
          // Si elle n'est pas actuellement selectionner, on effectu le tri et on la met en selectionné
          changeOption(span);
          const mediasNew = await sortMedia("popularity", medias);
          const mediaCurrent = document.querySelectorAll(".mediaCard");
          mediaCurrent.forEach((media) => {
            media.remove();
          });
          await displayMedias(mediasNew, name);
          }
      } else if (span.getAttribute("id") === "date") {
        if (!span.classList.contains("selected")) {
          changeOption(span);
          const mediasNew = await sortMedia("date", medias);
          const mediaCurrent = document.querySelectorAll(".mediaCard");
          mediaCurrent.forEach((media) => {
            media.remove();
          });
          await displayMedias(mediasNew, name);
        }
      } else if (span.getAttribute("id") === "title") {
        if (!span.classList.contains("selected")) {
          changeOption(span);
          const mediasNew = await sortMedia("title", medias);
          const mediaCurrent = document.querySelectorAll(".mediaCard");
          mediaCurrent.forEach((media) => {
            media.remove();
          });
          await displayMedias(mediasNew, name);
          console.log(document.querySelectorAll("figure"));
        }
      } else {
        console.log(
          "une erreur a été detecté lors de la récupération du type de tri"
        );
      }
    });
  });
}

// Fonction permettant d'ouvrir le trie
async function openSort() {
  const sort = document.querySelector(".select--custom");
  sort.addEventListener("click", () => {
    if (sort.classList.contains("select--open")) {
      sort.classList.remove("select--open");
    } else {
      sort.classList.add("select--open");
    }
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
  eventOption(medias, name);
  openSort();
}

init();
