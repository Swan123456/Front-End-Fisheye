class Media {
  constructor(data) {
    if (data.image) {
      this.pictureId = data.id;
      this.title = data.title;
      this.image = data.image;
      this.likes = data.likes;
      this.date = data.date;
      this.price = data.price;
    } else if (data.video) {
      this.pictureId = data.id;
      this.title = data.title;
      this.video = data.video;
      this.likes = data.likes;
      this.date = data.date;
      this.price = data.price;
    }
  }

  getLikes() {
    return this.likes;
  }

  getDate() {
    const adjustedDate = new Date(this.date);
    adjustedDate.setHours(0, 0, 0, 0);
    return adjustedDate;
  }
}

function photographerTemplate(data) {
  const {
    id, name, portrait, city, country, tagline, price,
  } = data;

  const picture = `assets/photographers/${portrait}`;
  const alt = `photo de profil de ${name}`;
  const ariaLabel = name;
  const linkHref = `photographer.html?photographer=${id}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const link = document.createElement('a');
    const infos = document.createElement('div');
    link.setAttribute('href', linkHref);

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', alt);
    img.setAttribute('aria-label', ariaLabel);

    const h2 = document.createElement('h2');
    h2.textContent = name;

    infos.classList.add('photographer-infos');
    const p = document.createElement('p');
    p.textContent = `${city},  ${country}`;

    const desc = document.createElement('p');
    desc.innerHTML = `${tagline} <br> ${price}€ /jour`;

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(infos);
    infos.setAttribute('tabindex', '0');
    infos.appendChild(p);
    infos.appendChild(desc);

    return article;
  }

  return {
    name,
    picture,
    getUserCardDOM,
    price,
  };
}

function photographerProfilTemplate(photographer, media) {
  const {
    name, portrait, city, country, tagline, price,
  } = photographer;
  const photographersSection = document.querySelector('.photograph-header');
  const portfolioSection = document.querySelector('.portfolio-section');
  const directoryName = name.split(' ')[0];

  // declaration des variables pour compter les likes
  const likesTotalElement = document.createElement('div');

  // instansiation de l'objet media
  const mediaObjects = media.map((m) => new Media(m));

  function photographerProfil() {
    const div = document.createElement('div');
    photographersSection.appendChild(div);

    const h1 = document.createElement('h1');
    h1.textContent = name;
    h1.setAttribute('tabindex', '0');

    const pCity = document.createElement('p');
    pCity.textContent = `${city}, ${country}`;
    pCity.setAttribute('tabindex', '0');

    const pTagline = document.createElement('p');
    pTagline.textContent = tagline;
    pTagline.setAttribute('tabindex', '0');

    div.appendChild(h1);
    div.appendChild(pCity);
    div.appendChild(pTagline);

    const divPortrait = document.createElement('div');
    photographersSection.appendChild(divPortrait);

    const img = document.createElement('img');
    img.setAttribute('src', `assets/photographers/${portrait}`);
    img.setAttribute('alt', name);
    img.setAttribute('tabindex', '0');

    divPortrait.appendChild(img);

    const contactButton = document.querySelector('.contact_button');
    photographersSection.insertBefore(div, contactButton, div);

    // affichage de l'onglet en bas a droite
    function aside() {
      const asideElement = document.querySelector('aside');
      const priceElement = document.createElement('div');
      const likeIcon = document.createElement('i');
      likeIcon.classList.add('fas', 'fa-heart');

      priceElement.textContent = `${price} €/jour`;
      asideElement.appendChild(likesTotalElement);
      asideElement.appendChild(likeIcon);
      asideElement.appendChild(priceElement);
    }

    aside();
  }

  function portfolio() {
    const div = document.querySelector('.portfolio');
    // variable pour avoir le bon chemin du dossier ou se trouve les photos
    portfolioSection.appendChild(div);
    let likesTotal = 0;
    likesTotalElement.textContent = likesTotal;

    // mise a joursdes likes totals pour le petit onglet aside en bas a droite
    function updateLikesTotal() {
      likesTotal = 0;
      mediaObjects.forEach((m) => {
        likesTotal += m.getLikes();
      });
      likesTotalElement.textContent = likesTotal;
      return likesTotal;
    }

    // fonction d'affichage de l'image en grand
    function displayImageOverlay(
      imageUrl,
      currentIndex,
    ) {
      const overlay = document.createElement('div');
      overlay.classList.add('image-overlay');

      const closeIcon = document.createElement('span');
      closeIcon.classList.add('close-icon');
      closeIcon.innerHTML = '&times;';
      closeIcon.setAttribute('tabindex', '0');
      overlay.appendChild(closeIcon);

      let mediaElement;

      if (mediaObjects[currentIndex].image) {
        mediaElement = document.createElement('img');
        mediaElement.setAttribute('src', imageUrl);
        mediaElement.setAttribute('alt', 'Image en grand');
      } else if (mediaObjects[currentIndex].video) {
        mediaElement = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute('src', imageUrl);
        source.setAttribute('type', 'video/mp4');
        mediaElement.appendChild(source);
        mediaElement.setAttribute('controls', '');
        mediaElement.setAttribute('preload', 'metadata');
      }

      overlay.appendChild(mediaElement);

      const backIcon = document.createElement('span');
      backIcon.classList.add('back-icon');
      backIcon.innerHTML = '<i class="fas fa-chevron-left"></i>';
      backIcon.setAttribute('tabindex', '0');
      overlay.appendChild(backIcon);

      const nextIcon = document.createElement('span');
      nextIcon.classList.add('next-icon');
      nextIcon.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextIcon.setAttribute('tabindex', '0');
      overlay.appendChild(nextIcon);

      document.body.appendChild(overlay);

      closeIcon.addEventListener('click', () => {
        document.body.removeChild(overlay);
      });

      closeIcon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          document.body.removeChild(overlay);
        }
      });

      backIcon.addEventListener('click', () => {
        const prevIndex = currentIndex - 1 < 0 ? mediaObjects.length - 1 : currentIndex - 1;
        const prevMedia = mediaObjects[prevIndex];
        const prevImageUrl = `assets/media/${directoryName}/${
          prevMedia.image || prevMedia.video
        }`;
        displayImageOverlay(
          prevImageUrl,
          prevIndex,
          mediaObjects,
          directoryName,
        );
        document.body.removeChild(overlay);
      });

      nextIcon.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % mediaObjects.length;
        const nextMedia = mediaObjects[nextIndex];
        const nextImageUrl = `assets/media/${directoryName}/${
          nextMedia.image || nextMedia.video
        }`;
        displayImageOverlay(
          nextImageUrl,
          nextIndex,
          mediaObjects,
          directoryName,
        );
        document.body.removeChild(overlay);
      });

      nextIcon.addEventListener('keydown', () => {
        const nextIndex = (currentIndex + 1) % mediaObjects.length;
        const nextMedia = mediaObjects[nextIndex];
        const nextImageUrl = `assets/media/${directoryName}/${
          nextMedia.image || nextMedia.video
        }`;
        displayImageOverlay(
          nextImageUrl,
          nextIndex,
          mediaObjects,
          directoryName,
        );
        document.body.removeChild(overlay);
      });
    }

    mediaObjects.forEach((m, index) => {
      const card = document.createElement('article');
      card.setAttribute('tabindex', '0');
      let mediaElement = m.image
        ? document.createElement('img')
        : document.createElement('video');
      mediaElement.setAttribute('tabindex', '0');
      mediaElement.setAttribute('alt', name);
      const content = document.createElement('div');
      content.setAttribute('tabindex', '0');
      const title = document.createElement('span');
      title.setAttribute('tabindex', '0');
      title.classList.add('name');
      const likes = document.createElement('span');
      likes.classList.add('likes');
      likes.setAttribute('arialabel', `${m.likes} j'aimes`);
      likes.setAttribute('tabindex', '0');
      const ariaLabel = m.title;
      card.setAttribute('aria-label', `${ariaLabel}, Agrandir l'image`);
      let imageUrl;

      // affichage de l'image en grand au clique
      mediaElement.addEventListener('click', (event) => {
        event.stopPropagation();
        if (m.video) {
          mediaElement = document.createElement('video');
          const source = document.createElement('source');
          source.setAttribute('src', imageUrl);
          source.setAttribute('type', 'video/mp4');
          mediaElement.appendChild(source);
          mediaElement.setAttribute('controls', '');
          mediaElement.setAttribute('preload', 'metadata');
        } else {
          imageUrl = `assets/media/${directoryName}/${m.image}`;
          displayImageOverlay(imageUrl, index, mediaObjects, directoryName);
        }
      });

      mediaElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.stopPropagation();
          if (m.video) {
            mediaElement = document.createElement('video');
            const source = document.createElement('source');
            source.setAttribute('src', imageUrl);
            source.setAttribute('type', 'video/mp4');
            mediaElement.appendChild(source);
            mediaElement.setAttribute('controls', '');
            mediaElement.setAttribute('preload', 'metadata');
          } else {
            imageUrl = `assets/media/${directoryName}/${m.image}`;
            displayImageOverlay(imageUrl, index, mediaObjects, directoryName);
          }
        }
      });

      // incrementation ou décrémentation des likes au click
      const likeIcon = document.createElement('i');
      likeIcon.classList.add('far', 'fa-heart');
      likeIcon.setAttribute('ariaLabel', 'Mettre un j aime');
      likeIcon.setAttribute('tabindex', '0');

      likeIcon.addEventListener('click', () => {
        if (likeIcon.classList.contains('far')) {
          // L'utilisateur a cliqué pour ajouter un like
          m.likes += 1;
          likes.textContent = m.likes;
          likeIcon.classList.remove('far');
          likeIcon.classList.add('fas');
        } else {
          // L'utilisateur a cliqué pour retirer un like
          m.likes -= 1;
          likes.textContent = m.likes;
          likeIcon.classList.remove('fas');
          likeIcon.classList.add('far');
        }
        updateLikesTotal();
      });

      likeIcon.addEventListener('keydown', () => {
        if (likeIcon.classList.contains('far')) {
          // L'utilisateur a cliqué pour ajouter un like
          m.likes += 1;
          likes.textContent = m.likes;
          likeIcon.classList.remove('far');
          likeIcon.classList.add('fas');
        } else {
          // L'utilisateur a cliqué pour retirer un like
          m.likes -= 1;
          likes.textContent = m.likes;
          likeIcon.classList.remove('fas');
          likeIcon.classList.add('far');
        }
        updateLikesTotal();
      });
      updateLikesTotal();

      if (m.image) {
        mediaElement.setAttribute(
          'src',
          `assets/media/${directoryName}/${m.image}`,
        );
      } else if (m.video) {
        const source = document.createElement('source');
        source.setAttribute('src', `assets/media/${directoryName}/${m.video}`);
        source.setAttribute('type', 'video/mp4');
        mediaElement.appendChild(source);
        mediaElement.setAttribute('controls', '');
        mediaElement.setAttribute('preload', 'metadata');
      }

      likesTotal += m.likes;
      title.textContent = m.title;
      likes.textContent = m.likes;

      card.appendChild(mediaElement);
      card.appendChild(title);
      card.appendChild(content);
      content.appendChild(title);
      content.appendChild(likes);
      content.appendChild(likeIcon);

      div.appendChild(card);
    });

    // fonctionnalitée de filtre
    const filterSection = document.querySelector('.filter');

    const selectElement = document.createElement('select');
    selectElement.classList.add('selector');
    filterSection.appendChild(selectElement);

    const options = ['popularite', 'date', 'titre'];
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option.charAt(0).toUpperCase() + option.slice(1);
      selectElement.appendChild(optionElement);
    });

    function sortMedia(selectedValue) {
      const portfolioSection = document.querySelector('.portfolio');
      const cards = Array.from(portfolioSection.querySelectorAll('article'));

      while (portfolioSection.firstChild) {
        portfolioSection.removeChild(portfolioSection.firstChild);
      }

      switch (selectedValue) {
        case 'popularite':
          cards.sort((a, b) => {
            const likesA = parseInt(a.querySelector('span.likes').textContent, 10);
            const likesB = parseInt(b.querySelector('span.likes').textContent, 10);
            return likesB - likesA;
          });
          break;
        case 'date':
          cards.sort((a, b) => {
            const mediaA = mediaObjects.find(
              (media) => media.pictureId === a.pictureId,
            );
            const mediaB = mediaObjects.find(
              (media) => media.pictureId === b.pictureId,
            );
            const dateA = mediaA ? mediaA.getDate() : null;
            const dateB = mediaB ? mediaB.getDate() : null;
            if (dateA && dateB) {
              return dateA - dateB;
            } if (dateA) {
              return -1;
            } if (dateB) {
              return 1;
            }
            return 0;
          });
          break;
        case 'titre':
          cards.sort((a, b) => {
            const titleA = a.querySelector('.name').textContent.toLowerCase();
            const titleB = b.querySelector('.name').textContent.toLowerCase();
            return titleA.localeCompare(titleB);
          });
          break;
        default:
          break;
      }

      cards.forEach((card) => {
        portfolioSection.appendChild(card);
      });
    }
    selectElement.addEventListener('change', () => {
      const selectedValue = selectElement.value;
      sortMedia(selectedValue);
    });
  }
  portfolio();
  photographerProfil();
}
