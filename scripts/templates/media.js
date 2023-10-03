function mediaTemplate(data, name) {
  const { title, id, image, video, likes } = data; // On récupère les données du média

  const srcImage = `assets/images/${name}/${image}`; // On prépare le lien vers la photo
  const srcVideo = `assets/images/${name}/${video}`; // On prépare le lien vers la vidéo
  const heartEmpty = `assets/icons/heart__empty--orange.svg`; // On charge le coeur
  const heartFull = `assets/icons/heart__full--orange.svg`;

  //   Faire une construction par type de média (en fonction de propriété video ou image)
  // Fonction permettant d'afficher les médias
  function getMediasDOM(i) {
    const figure = document.createElement("figure");
    figure.setAttribute("class", "mediaCard");
    figure.setAttribute("id", i);
    // Factory
    if (image != undefined) {
      // Si l'image existe
      const img = document.createElement("img");
      img.setAttribute("src", srcImage);
      img.setAttribute("alt", "");
      img.setAttribute("class", "media__image");
      figure.appendChild(img);
    }
    if (video != undefined) {
      // Si la vidéo existe
      const video = document.createElement("video");
      const src = document.createElement("source");
      src.setAttribute("src", srcVideo);
      src.setAttribute("type", "video/mp4");
      video.setAttribute("class", "media__image");
      video.setAttribute("controls", "");
      video.setAttribute("autoplay", "");
      video.appendChild(src);
      figure.appendChild(video);
    }
    // Fin factory
    const figcaption = document.createElement("figcaption");
    figcaption.setAttribute("class", "media__figcaption");
    const p = document.createElement("p");
    p.setAttribute("class", "media__figcaption__title");
    p.setAttribute("tabindex", "0");
    p.textContent = title;

    const like = document.createElement("div");
    like.setAttribute("class", "media__figcaption__like");

    const nbLike = document.createElement("p");
    nbLike.setAttribute("class", "media__figcaption__likeText nbLikes");
    nbLike.textContent = likes;

    const icoEmpty = document.createElement("img");
    icoEmpty.setAttribute("src", heartEmpty);
    icoEmpty.setAttribute("alt", "");
    icoEmpty.setAttribute("class", "media__figcaption__likeIco empty");
    icoEmpty.setAttribute("tabindex", "0");
    icoEmpty.setAttribute("alt", "like");

    const icoFull = document.createElement("img");
    icoFull.setAttribute("src", heartFull);
    icoFull.setAttribute("alt", "");
    icoFull.setAttribute("class", "media__figcaption__likeIco full notDisplay");
    icoFull.setAttribute("tabindex", "0");
    icoFull.setAttribute("alt", "dislike");

    figcaption.appendChild(p);
    like.appendChild(nbLike);
    like.appendChild(icoEmpty);
    like.appendChild(icoFull);
    figcaption.appendChild(like);
    figure.appendChild(figcaption);

    // figure.appendChild(createHeartComponent());

    return figure;
  }

  return { title, id, getMediasDOM };
}

// Une fonction par composant, pour ensuite avoir une fonction globale qui appelle toutes les fonctions des composants
// createMediaComponent = createHeartComp + createNumberLikes + createTitleComponent
// Plus lisible et maintenable
function numberOfLikes() {
  // Implémenter le nombre de like dynamique
}
function createHeartComponent() {
  // Implémenter font-awesome dans photographer.html
  const like = document.createElement("i");
  like.setAttribute("class", "fa fa-heart");

  return like;
}

async function getGlobalLikes() {
  // return new Promise((resolve)=>{
  //   getMedia()
  // })

  const photographerMedias = await getMedia();
  let totalLikes = 0;
  photographerMedias.forEach((photographerMedia) => {
    totalLikes += photographerMedia.likes;
  });

  return totalLikes;
}

// Affichage des likes dans l'encart en bas à droite
function displayGlobalLikes(likes) {
  const el = document.getElementById("nbLikes");
  el.textContent = likes;
}

async function initLikes() {
  let totalLikes = await getGlobalLikes();
  displayGlobalLikes(totalLikes);
}

initLikes();


