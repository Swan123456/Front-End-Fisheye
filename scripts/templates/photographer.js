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
        desc.innerHTML = tagline + `<br>` + price + '€';

        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);
        article.appendChild(p);
        article.appendChild(desc);

        return article;
    }

    return { name, picture, getUserCardDOM };
}

function photographerProfilTemplate(photographer, media) {
    const { id, name, portrait, city, country, tagline, price } = photographer;
    const photographersSection = document.querySelector(".photographer_section");
    const portfolioSection = document.querySelector(".portfolio-section")

    const mediaObjects = media.map((m) => new Media(m));

    function photographerProfil() {
        const div = document.createElement('div');
        photographersSection.appendChild(div);

        const h1 = document.createElement('h1');
        h1.textContent = name;
      
        const pCity = document.createElement('p');
        pCity.textContent = city;
      
        const pCountry = document.createElement('p');
        pCountry.textContent = country;

        div.appendChild(h1);
        div.appendChild(pCity);
        div.appendChild(pCountry);

        const divPortrait = document.createElement('div');
        photographersSection.appendChild(divPortrait);

        const img = document.createElement('img');
        img.setAttribute('src', `assets/photographers/${portrait}`);
        img.setAttribute('alt', name);

        divPortrait.appendChild(img);
    }

    function portfolio() {
        const div = document.createElement('div');
        const directoryName = name.split(' ')[0];;
        portfolioSection.appendChild(div);

        mediaObjects.forEach((m) => {
            const card = document.createElement('div');
            const mediaElement = m.image ? document.createElement('img') : document.createElement('video');
            const name = document.createElement('p');

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
          
              name.textContent = m.title;
          
              card.appendChild(mediaElement);
              card.appendChild(name);
          
              div.appendChild(card);
          });
        
    }

    photographerProfil()
    portfolio()

}
