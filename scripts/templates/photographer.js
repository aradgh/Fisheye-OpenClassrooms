async function getPhotographers() {
  try {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographers = data.photographers;
    console.log(photographers); // Affichage des données récupérées dans la console
    return { photographers }; // Retourner les données récupérées
  } catch (error) {
    console.error("Error fetching photographers data:", error);
    return { photographers: [] }; // Retourner un tableau vide en cas d'erreur
  }
}

function photographerTemplate(data) {
  const { name, portrait, city, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    
    const h2 = document.createElement("h2");
    h2.textContent = name;
    
    const h3 = document.createElement("h3");
    h3.textContent = city;
    
    const p = document.createElement("p");
    p.textContent = tagline;
    
    const p_2 = document.createElement("p");
    p_2.textContent = price + "€/jour";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(p_2);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
