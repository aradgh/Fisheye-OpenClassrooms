// Récupérer la liste des photographes dans photographers.json
async function getPhotographers() {
  try {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographers = data.photographers;
    return { photographers }; // Retourner les données récupérées
  } catch (error) {
    console.error("Error fetching photographers data:", error);
    return { photographers: [] }; // Retourner un tableau vide en cas d'erreur
  }
}

function photographerTemplate(data) {
  // Récupération des données du photographe
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Création d'un lien contenant le titre et la photo du photographe
    const a = document.createElement("a");
    a.setAttribute("href", `./photographer.html?id=${id}`);
    a.setAttribute("aria-label", name);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("class", "imgPhotographer");

    // Création de la localisation
    const localisationElement = document.createElement("p");
    localisationElement.textContent = `${city}, ${country}`;
    localisationElement.setAttribute("class", "localisation");

    // Création de la phrase d'acroche
    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;
    taglineElement.setAttribute("class", "tagline");

    // Création du prix
    const priceElement = document.createElement("p");
    priceElement.textContent = `${price}€/jour`;
    priceElement.setAttribute("class", "price");

    // Ajout de ces éléments à l'article
    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(localisationElement);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);

    return article;
  }
  return { name, id, city, country, tagline, price, portrait, getUserCardDOM };
}
