async function getPhotographerById(photographerId) {
  const response = await fetch('../data/photographers.json');
  const data = await response.json();
  const photographer = data.photographers.find((p) => p.id === parseInt(photographerId, 10));

  return photographer;
}

// Fonction pour récupérer les médias d'un photographe spécifique en utilisant son ID
async function getMediaByPhotographerId() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('photographer');

  if (!photographerId) {
    console.error('Pas de photographe selectionné');
    return [];
  }

  const photographer = await getPhotographerById(photographerId);

  const response = await fetch('../data/photographers.json');
  const data = await response.json();
  const media = data.media.filter((m) => m.photographerId === parseInt(photographerId, 10));

  photographerProfilTemplate(photographer, media);
  return photographerId;
}
getMediaByPhotographerId();
