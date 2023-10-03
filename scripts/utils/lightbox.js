async function lightbox() {
    // Éléments du DOM
    const figures = document.querySelectorAll('figure');

    figures.forEach((figure) => {
        figure.querySelector('media__image').addEventListener('click', alert("C'est bon ça marche mon sauce"));
    });
}