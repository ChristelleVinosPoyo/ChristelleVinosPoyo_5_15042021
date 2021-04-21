const idOfUrl = window.location.search;
console.log(idOfUrl);
// pour enlever le ? de l'id récupéré à partir de l'url : methode slice
const id = idOfUrl.slice(1); //"1" pour enlever le 1er caractère de la chaine de caractères
console.log(id);


fetch(`http://localhost:3000/api/cameras/${id}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {

    console.log(data);

    // affichage des données de la fiche produit
    document.querySelector(".product-sheet__container").innerHTML = `
        <div class="product"> 
            <div class="product__img">
                <img src=${data.imageUrl} alt="Photo d'un appareil photo argentique vintage">
            </div>
            <div class="product__content">
                <h1>${data.name}</h1>
                <p>${data.description}</p>
                <div class="optionsDisponibles">
                    <p>Options disponibles</p>
                    <div class="options">
                        <span class="option">Objectif ${data.lenses[0]}</span>
                        <span class="option">Objectif ${data.lenses[1]}</span>
                    </div>
                </div>
                <span>${data.price} €</span>
                <button class="button-panier">Ajouter au panier</button>

            </div>
        </div>
        `;
    // menu déroulant pour les options de caméras -------------> A AMELIORER
    const optionsDiponibles = document.querySelector(".optionsDisponibles");
    const options = document.querySelector(".options");
    optionsDiponibles.addEventListener("mouseover", function(){
        options.style.visibility = "visible"; //idem avec visibility
    })
    optionsDiponibles.addEventListener("mouseout", function(){
        options.style.visibility = "hidden";
    })


    // suivre evt clic sur le bouton "ajouter au panier" envoyer les données à local storage
    const button = document.querySelector(".button-panier");
    button.addEventListener("click", function(){
        localStorage.setItem(data.name, data)
    })
    console.log();
  });
