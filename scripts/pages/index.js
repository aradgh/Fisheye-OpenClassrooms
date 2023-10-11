// Afficher toutes les cartes des photographes sur la page d'accueil
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // Comprendre d'abord le pattern Factory Method pour comprendre pourquoi il faut d'abord
    // passer par photographerTemplate() pour ensuite utiliser la fonction sous-jacente getUserCardDOM()
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Initialiser la page d'accueil
async function init() {
  // Récupérer les données des photographes
  const { photographers } = await getPhotographersData();
  // Afficher les données
  displayData(photographers);
}

init();
