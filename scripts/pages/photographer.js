async function getPhotographerById(photographerId) {
  const response = await fetch("../data/photographers.json");
  const data = await response.json();
  const photographer = data.photographers.find((p) => p.id === parseInt(photographerId));

  return photographer;
}

// Fonction pour récupérer les médias d'un photographe spécifique en utilisant son ID
async function getMediaByPhotographerId() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("photographer");

  if (!photographerId) {
    console.error("Pas de photographe selectionné");
    return [];
  }

  const photographer = await getPhotographerById(photographerId);

  let response = await fetch("../data/photographers.json");
  let data = await response.json();
  let media = data.media.filter((m) => m.photographerId === parseInt(photographerId));

  photographerProfilTemplate(photographer, media)
}


getMediaByPhotographerId()