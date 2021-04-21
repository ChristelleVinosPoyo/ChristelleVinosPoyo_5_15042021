const idOfUrl = window.location.search;
console.log(idOfUrl);
// pour enlever le ? de l'id récupéré à partir de l'url : methode slice
const id = idOfUrl.slice(1) //"1" pour enlever le 1er caractère de la chaine de caractères
console.log(id);


fetch(`http://localhost:3000/api/cameras/${id}`)
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
        document.querySelector(".product-sheet__container").innerHTML =
        `
        <div class="product"> 
            <div class="product__img">
                <img src=${data.imageUrl} alt="Photo d'un appareil photo argentique vintage">
            </div>
            <div class="product__content">
                <h1>${data.name}</h1>
                <p>${data.description}</p>
                <div>
                    <p>Options dispnibles</p>
                    <span>Objectif ${data.lenses[0]}</span>
                    <span>Objectif ${data.lenses[1]}</span>
                </div>
                <span>${data.price} €</span>
                <button>Ajouter au panier</button>

            </div>
        </div>
        `
})