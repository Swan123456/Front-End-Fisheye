class Photographer {
    constructor(id, tagline, city) {
      this.id = id;
      this.tagline = tagline;
      this.city = city;
    } 
}

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
}

function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const alt = 'photo de profil de ' + name;
    const linkHref = 'photographer.html?photographer=' + id;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const link = document.createElement('a');
        link.setAttribute('href', linkHref);

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', alt);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const p = document.createElement('p');
        p.textContent = city + ', ' + country;

        const desc = document.createElement('p');
        desc.innerHTML = tagline + `<br>` + price + '€' + '/jour';

        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);
        article.appendChild(p);
        article.appendChild(desc);

        return article;
    }

    return { name, picture, getUserCardDOM, price };
}

function photographerProfilTemplate(photographer, media) {
    const { id, name, portrait, city, country, tagline, price } = photographer;
    const photographersSection = document.querySelector(".photograph-header");
    const portfolioSection = document.querySelector(".portfolio-section");

    // declaration des variables pour compter les likes 
    const likesTotalElement = document.createElement('div');

    // instansiation de l'objet media
    const mediaObjects = media.map((m) => new Media(m));

    function photographerProfil() {
        const div = document.createElement('div');
        photographersSection.appendChild(div);

        const h1 = document.createElement('h1');
        h1.textContent = name;
      
        const pCity = document.createElement('p');
        pCity.textContent = city + ' ' + country;

        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;

        div.appendChild(h1);
        div.appendChild(pCity);
        div.appendChild(pTagline);

        const divPortrait = document.createElement('div');
        photographersSection.appendChild(divPortrait);

        const img = document.createElement('img');
        img.setAttribute('src', `assets/photographers/${portrait}`);
        img.setAttribute('alt', name);

        divPortrait.appendChild(img);

        const contactButton = document.querySelector('.contact_button');
        photographersSection.insertBefore(div, contactButton, div);
        aside();
    }

    function portfolio() {
        const div = document.querySelector('.portfolio');
        const directoryName = name.split(' ')[0];
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
        
        mediaObjects.forEach((m) => {
            const card = document.createElement('article');
            const mediaElement = m.image ? document.createElement('img') : document.createElement('video');
            const content = document.createElement('div');
            const name = document.createElement('span');
            const likes = document.createElement('span');

            // incrementation ou décrémentation des likes au click
            const likeIcon = document.createElement('i');
            likeIcon.classList.add('far', 'fa-heart');

            likeIcon.addEventListener('click', () => {
            if (likeIcon.classList.contains('far')) {
                // L'utilisateur a cliqué pour ajouter un like
                m.likes++;
                likes.textContent = m.likes;
                likeIcon.classList.remove('far');
                likeIcon.classList.add('fas');
            } else {
                // L'utilisateur a cliqué pour retirer un like
                m.likes--;
                likes.textContent = m.likes;
                likeIcon.classList.remove('fas');
                likeIcon.classList.add('far');
            }
            updateLikesTotal();
        });
        updateLikesTotal();
        
            if (m.image) {
                mediaElement.setAttribute('src', `assets/media/${directoryName}/${m.image}`);
            } else if (m.video) {
                const source = document.createElement('source');
                source.setAttribute('src', `assets/media/${directoryName}/${m.video}`);
                source.setAttribute('type', 'video/mp4');
                mediaElement.appendChild(source);
                mediaElement.setAttribute('controls', '');
                mediaElement.setAttribute('preload', 'metadata');
            }
              
              likesTotal += m.likes;
              name.textContent = m.title;
              likes.textContent = m.likes;
          
              card.appendChild(mediaElement);
              card.appendChild(name);
              card.appendChild(content);
              content.appendChild(name);
              content.appendChild(likes);
              content.appendChild(likeIcon);
          
              div.appendChild(card);
        });
    }

    // affichage de l'onglet e bas a droite 
    function aside() {
        const asideElement = document.querySelector('aside');
        const priceElement = document.createElement('div');
        const likeIcon = document.createElement('i');
        likeIcon.classList.add('fas', 'fa-heart');

        priceElement.textContent = price + '€' + '/jour';
        asideElement.appendChild(likesTotalElement);
        asideElement.appendChild(likeIcon);
        asideElement.appendChild(priceElement);
    }

    portfolio()
    photographerProfil()

}
