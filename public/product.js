let params = (new URL(document.location)).searchParams; // pour récupérer les paramètres de l'URL
console.log(params);
let id = params.get('id'); // pour récupérer l'id présent dans l'URL
console.log(id);

fetch(`http://localhost:3000/api/cameras/${id}`)
.then((response) => {
    return response.json();
})
.then((data) => {
    // mise en forme du prix au format euros
    let price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.price/100);

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
                <button class="button-panier">Ajouter au panier</button>

            </div>
        </div>
        `;
    for (let lense of data.lenses){
        document.getElementById("options").innerHTML +=
        `<option id="option" value="${lense}">Objectif ${lense}</option>`
    }

    // menu déroulant : selection d'une option -------------> else if ne marche pas 
    let options = document.querySelectorAll(".option");

    
    for (let option of options) {
        option.addEventListener("click", function(){
                if (option.style.background = "none"){
                    option.style.background = "#1f3528";
                    option.style.color = "white"
                }else if(option.style.background = "#1f3528"){
                    option.style.background = "none";
                    option.style.color = "#17271e"
                }
                if (option === "undefined"){
                    option.style.visibility = "hidden"
                }
        }
        ) 
    }   
    
    // ________________ localstorage ______________________________________________________________________
    
    const button = document.querySelector(".button-panier");
    
    button.addEventListener("click", function(){
        let inLocalStorage = JSON.parse(localStorage.getItem("ProductsInLocalStorage")); //conversion en JS de l'objet "productInLocalStorage" récupéré sur localstorage
        let selectOption = document.getElementById('options') 

        if (!inLocalStorage){ // s'il n'y a aucun produits enregistrés dans localstorage
            let inLocalStorage = []
            data.quantity = 1;
            data.option = selectOption.options[selectOption.selectedIndex].value; // Récupération de l'option selectionnée
            inLocalStorage.push(data);
            localStorage.setItem("ProductsInLocalStorage", JSON.stringify(inLocalStorage)) //envoi du nouveau produit selectionnée vers localstorage au format JSON
        }
        else if (inLocalStorage){ // s'il y a déjà des produits enregistrés dans localstorage
            
            let indexOfDoublon = inLocalStorage.findIndex(element => element._id === data._id);
            console.log(`index du doublon : ${indexOfDoublon}`);

            //si le produit à ajouter n'existe pas dans inLocalStorage OU s'il existe mais avec un option différente
            if (indexOfDoublon === -1 || (indexOfDoublon >= 0 && inLocalStorage[indexOfDoublon].option != selectOption.options[selectOption.selectedIndex].value)){ 
                data.quantity = 1;
                data.option = selectOption.value;
                inLocalStorage.push(data);
                localStorage.setItem("ProductsInLocalStorage", JSON.stringify(inLocalStorage)) 
            }
            //si le produit à ajouter existe déjà dans inLocalStorage ET l'option selectionnée est la même
            else if(indexOfDoublon >= 0 && (inLocalStorage[indexOfDoublon].option === selectOption.options[selectOption.selectedIndex].value)){ 
                inLocalStorage[indexOfDoublon].quantity ++;
                data.option = selectOption.value;
                localStorage.setItem("ProductsInLocalStorage", JSON.stringify(inLocalStorage)) 
            }
        } 
        })
    })
