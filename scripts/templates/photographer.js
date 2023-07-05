class Photographer {
    constructor(id, tagline, city) {
      this.id = id;
      this.tagline = tagline;
      this.city = city;
    } 
}

class Media {
    constructor(id, title, image, likes, date, price) {
        this.pictureId = id;
        this.title = title;
        this.image = image;
        this.likes = likes;
        this.date = date;
        this.price = price;
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
    // const media { id, } = media;
    const mediaObjects = media.map(
        (m) => new Media(m.id, m.photographerId, m.title, m.image, m.likes, m.date, m.price)
      );
      console.log("IDphotographe :", id);
      // Affichage des médias
      console.log("Médias associés :");
      mediaObjects.forEach((m) => {
        console.log("ID :", m.pictureId);
        console.log("Titre :", m.title);
        console.log("Image :", m.image);
        console.log("Likes :", m.likes);
        console.log("Date :", m.date);
        console.log("Prix :", m.price);
        console.log("--------------------");
      });

      
}
