const idOfUrl = window.location.search; // pour récupérer la partie de l'url à partir du "?"
console.log(idOfUrl);

// pour enlever le ? de l'id récupéré à partir de l'url : methode slice
const id = idOfUrl.slice(1); //"1" pour couper idOfUrl après le 1er caractère de la chaine de caractères
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
                <div class="options-disponibles">
                    <p>Options disponibles</p>
                    <div class="options">
                        <span class="option option1">Objectif ${data.lenses[0]}</span>
                        <span class="option option2">Objectif ${data.lenses[1]}</span>
                    </div>
                </div>
                <span>${data.price} €</span>
                <button class="button-panier">Ajouter au panier</button>

            </div>
        </div>
        `;

    // menu déroulant : selection d'une option -------------> else if ne marche pas 
    const option = document.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].addEventListener("click", function() {
            if (option[i].style.background = "none"){
                option[i].style.background = "#1f3528";
                option[i].style.color = "white"
            }else if(option[i].style.background = "#1f3528"){
                option[i].style.background = "none";
                option[i].style.color = "#17271e"
            }
        });
    }
    // ________________ localstorage ______________________________________________________________________
    
    const button = document.querySelector(".button-panier");
    
    button.addEventListener("click", function(){
        let inLocalStorage = JSON.parse(localStorage.getItem("ProductsInLocalStorage")); //conversion en JS de l'objet "productInLocalStorage" récupéré sur localstorage
        
        if (!inLocalStorage){ // s'il n'y a aucun produits enregistrés dans localstorage
            let inLocalStorage = []
            inLocalStorage.push(data);
            localStorage.setItem("ProductsInLocalStorage", JSON.stringify(inLocalStorage)) //envoi du nouveau produit selectionnée vers localstorage au format JSON
        }
        else if (inLocalStorage){ // s'il y a déjà des produits enregistrés dans localstorage
            
            let verifDoublons = inLocalStorage.include(data._id) // verifier s'il y a un doublon
            console.log(verifDoublons);
            }
            if (verifDoublons){ // s'il y a un doublon
                inLocalStorage.push(data);
                inLocalStorage.quantity ++
            } 
            else{ // s'il n'y a pas de doublon
                inLocalStorage.push(data);
                inLocalStorage.quantity = 1;
            }
            localStorage.setItem("ProductsInLocalStorage", JSON.stringify(inLocalStorage)) ;
            console.log(inLocalStorage);
        })
        })

  /*let monObjet = {
      date : "aujourd'hui",
      quantité : 3
  }
  console.log(monObjet);
  monObjet.nouvelleCle = null;
  monObjet.nouvelleCle += 1;
  console.log(monObjet);*/
