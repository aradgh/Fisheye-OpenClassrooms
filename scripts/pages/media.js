// Récupérer tous les médias
async function getAllMedias() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const media = data.media;

  return media;
}

// Récupérer les médias du photographe
async function getMedia() {
  const media = await getAllMedias();
  const photographerMedias = media.filter(
    (media) => media.photographerId == getPhotographerId()
  );

  return photographerMedias;
}

// Tri des médias
async function sortMedia(sortType, media) {
  switch (sortType) {
    case "popularity":
      //Sortir les fonctions tripardate, tripartitre, triparpopu
      await media.sort(function (a, b) {
        // On tri par nombre de like
        return b.likes - a.likes;
      });
      break;
    case "date":
      await media.sort(function (a, b) {
        a.date = new Date(a.date).getTime(); // On récupère la date au format milliseconde
        b.date = new Date(b.date).getTime(); // On récupère la date au format milliseconde
        return b.date - a.date; // On tri par date
      });
      break;
    case "title":
      await media.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      break;
    default:
      console.log("Une erreur est survenue dans le tri des médias");
  }

  return media;
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

// Tableau des options de tri
const sortingOptions = [
  { id: "popularity", label: "Popularité" },
  { id: "date", label: "Date" },
  { id: "title", label: "Titre" },
];

// Sélection de la liste déroulante
const select = document.getElementById("sortingOptions");

// Ajout des options à la liste déroulante
sortingOptions.forEach((option) => {
  const optionElement = document.createElement("option");
  optionElement.value = option.id;
  optionElement.text = option.label;
  select.appendChild(optionElement);
});

// Détecter le changement de sélection
select.addEventListener("change", async function () {
  const selectedSortOption = this.value; // Récupérer l'option sélectionnée

  //TODO : déplacer les variables name et medias en variables globales (plusieurs fonctions peuvent en avoir besoin)
  const photographer = await getPhotographer();
  const { name } = photographer; // Récupérer le nom du photographe

  const medias = await getMedia(); // Récupérer les médias

  const mediasSorted = await sortMedia(selectedSortOption, medias); // Trier les médias

  // Supprimer tous les médias affichés pour mettre les médias triés à la place
  const mediaCurrentlyDisplayed = document.querySelectorAll(".mediaCard");
  mediaCurrentlyDisplayed.forEach((media) => {
    media.remove();
  });
  await displayMedias(mediasSorted, name);
});