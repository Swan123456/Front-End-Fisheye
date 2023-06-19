class Photographer {
    constructor(id, tagline, city) {
      this.id = id;
      this.tagline = tagline;
      this.city = city;
    } 
}

function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const p = document.createElement( 'p' );
        p.textContent = city + ', ' + country;

        const desc = document.createElement( 'p' );
        desc.innerHTML = tagline + `<br>` + price + '€';

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(desc);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}
