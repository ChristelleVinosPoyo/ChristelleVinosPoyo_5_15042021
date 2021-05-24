let params = (new URL(document.location)).searchParams; // pour récupérer les paramètres de l'URL
let id = params.get('id'); // pour récupérer l'id présent dans l'URL

fetch(`http://localhost:3000/api/cameras/${id}`)
.then((response) => {
    return response.json();
})
.then((data) => {
    // mise en forme du prix au format euros
    let price = Utils.convertPrice(data.price);

    // affichage des données de la fiche produit
    document.querySelector(".product-sheet__container").innerHTML = `
        <div class="product"> 
            <div class="product__img">
                <img src=${data.imageUrl} alt="Photo d'un appareil photo argentique vintage">
            </div>
            <div class="product__content">
                <h1>${data.name}</h1>
                <p>${data.description}</p>
                <label for="options">Options disponibles :</label>
                <select name="options" id="options">
                </select>
                <span>${price}</span>
                <a class="button button-panier">Ajouter au panier</a>

            </div>
        </div>
        `;
    for (let lense of data.lenses){
        document.getElementById("options").innerHTML +=
        `<option id="option" value="${lense}">Objectif ${lense}</option>`
    }

   
    
    // ________________ localstorage ______________________________________________________________________
    
    const button = document.querySelector(".button-panier");
    
    button.addEventListener("click", function(){
        let inLocalStorage = JSON.parse(localStorage.getItem("ProductsInLocalStorage")); //conversion en JS de l'objet "productInLocalStorage" récupéré sur localstorage
        let selectOption = document.getElementById('options') 

        if (!inLocalStorage){ // s'il n'y a aucun produits enregistrés dans localstorage
            let inLocalStorage = []
            data.quantity = 1;
            data.option = selectOption.value; // Récupération de l'option selectionnée
            inLocalStorage.push(data);
            localStorage.setItem("ProductsInLocalStorage", JSON.stringify(inLocalStorage)) //envoi du nouveau produit selectionnée vers localstorage au format JSON
        }
        else if (inLocalStorage){ // s'il y a déjà des produits enregistrés dans localstorage
            
            data.option = selectOption.value
            let indexOfDoublon = inLocalStorage.findIndex(element => element._id === data._id && element.option === data.option) ;
            console.log(`index du doublon : ${indexOfDoublon}`);

            //si le produit à ajouter n'existe pas dans inLocalStorage OU s'il existe mais avec un option différente
            if (indexOfDoublon === -1){ 
                data.quantity = 1;
                data.option = selectOption.value;
                inLocalStorage.push(data);
                localStorage.setItem("ProductsInLocalStorage", JSON.stringify(inLocalStorage)) 
            }
            //si le produit à ajouter existe déjà dans inLocalStorage ET l'option selectionnée est la même
            else if(indexOfDoublon >= 0 ){ 
                inLocalStorage[indexOfDoublon].quantity ++;
                //data.option = selectOption.value;
                localStorage.setItem("ProductsInLocalStorage", JSON.stringify(inLocalStorage)) 
            }
        } 
        })
    })
    .catch(error => console.log(`message d'erreur : ${error}`))


