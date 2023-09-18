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
  let totalLikes;
  const photographerMedias = media.filter(
    (media) => media.photographerId == getPhotographerId()
  );
  photographerMedias.forEach((photographerMedia) => {
    totalLikes += photographerMedia.likes;
  });
  console.log(photographerMedias);
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
