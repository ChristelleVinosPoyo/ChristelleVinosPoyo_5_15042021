// _____________ AFFICHAGE DES DONNEES PRODUITS DANS LE PANIER _____________________________________________________________

let inLocalStorage = JSON.parse(localStorage.getItem("ProductsInLocalStorage")); // récupérations des données produit du localstorage

let tabTotalOrder = []; // pour calcul de la somme totale de la commande

if(inLocalStorage){ // s'il y a des produits dans le localstorage

    for(let product of inLocalStorage){
    
        // mise en forme du prix au format euros
        let cameraPrice = Utils.convertPrice(product.price);
        let cameraTotalPrice = Utils.convertPrice(product.quantity*product.price);
        
        tabTotalOrder.push(product.quantity*product.price); // pour calcul du prix total de la commande
        
        document.querySelector(".panier__container").innerHTML +=
        
        `<div class="camera">
            <div class="camera__name order-line">${product.name}</div>
            <div class="camera__option order-line">${product.option}</div>
            <div class="camera__quantity order-line">${product.quantity}</div>
            <div class="camera__price order-line">${cameraPrice}</div>
            <div class="camera__total order-line">${cameraTotalPrice}</div>
        </div>`
    }
}
else { // s'il n'y a pas de produits dans le localstorage
    document.querySelector(".panier__container").innerHTML =
    `Le panier est vide`
}

let somme = tabTotalOrder.reduce((a, b)=> a + b,0); // total de la commande en centimes
let totalOrderPrice = Utils.convertPrice(somme); //conversion au format "euros"
document.querySelector(".somme").innerHTML = `${totalOrderPrice}`;

// _____________ENVOI DE LA COMMANDE AU BACKEND_____________________________________________________________

let products = []; // données de la commande, à envoyer au backend 
let contact; // données du contact, à envoyer au backend
let submit = document.getElementById("submit"); // bouton "procéder au paiement"

submit.addEventListener("click", function(event){
    
    event.preventDefault();

    let email = document.getElementById("email");
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    const verifNom = nom.match(regex);
    const verifPrenom = prenom.match(regex);
    
    if(inLocalStorage && email.validity.valid && verifNom !== null && verifPrenom !== null){
        for(let product of inLocalStorage){
            products.push(product._id);
        }
        contact = {
            firstName: document.getElementById("nom").value,
            lastName: document.getElementById("prenom").value,
            address: document.getElementById("adresse").value,
            city: document.getElementById("ville").value,
            email: document.getElementById("email").value,
        }
    }
    else if (!inLocalStorage){
        window.alert("Le panier est vide.")
    }
    else if (verifNom === null || verifPrenom === null){
        window.alert("Veuillez remplir correctement chaque champ du formulaire.");
    }
    else if (!email.validity.valid){
        window.alert("Veuillez saisir une adresse mail valide.");
    }
    
    if(products.length > 0){ // s'il y a au moins un produit dans le panier
        fetch("http://localhost:3000/api/cameras/order", {
           method:"POST",
           body: JSON.stringify({products, contact}),
           headers: {
            'content-type' : 'application/json'  
           } 
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(`data : ${data}`);
            
            //ouverture de la page confirmOrder uniquement si le backend retourne un id de commande
            if(data.orderId){ 
                // stockage de données dans localstorage, pour les utiliser sur la page confirmOrder
                let confirmOrder = {
                    name: document.getElementById("prenom").value,
                    price: totalOrderPrice,
                    id: data.orderId
                }
                localStorage.setItem("forConfirmOrder", JSON.stringify(confirmOrder)) 
                window.open(`./confirmOrder.html`, "confirmOrderPage");

            } 
            else {
                window.alert("Un problème est survenu. Vérifiez que chaque champ du formulaire est complété.")
            }
        })
        .catch(error => console.log(`message d'erreur : ${error}`))
    } 

 })

