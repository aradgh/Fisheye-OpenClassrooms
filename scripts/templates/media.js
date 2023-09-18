function mediaTemplate(data, name) {
  const { title, id, image, video, likes } = data; // On récupère les données du média

  const srcImage = `assets/images/${name}/${image}`; // On prépare le lien vers la photo
  const srcVideo = `assets/images/${name}/${video}`; // On prépare le lien vers la vidéo

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
    p.textContent = title;
    figcaption.appendChild(p);
    figure.appendChild(figcaption);

    figure.appendChild(createHeartComponent());

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
