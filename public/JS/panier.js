// _____________ AFFICHAGE DES DONNEES PRODUITS DANS LE PANIER _____________________________________________________________

let inLocalStorage = JSON.parse(localStorage.getItem("ProductsInLocalStorage"));

let tabTotalOrder = []; // pour calcul de la somme totale de la commande

if(inLocalStorage){

    for(let product of inLocalStorage){
    
        // mise en forme du prix au format euros
        let cameraPrice = Utils.convertPrice(product.price);
        let cameraTotalPrice = Utils.convertPrice(product.quantity*product.price);
        
        tabTotalOrder.push(product.quantity*product.price);
        
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
let somme = tabTotalOrder.reduce((a, b)=> a + b,0); // total de la commande en centimes
let totalOrderPrice = Utils.convertPrice(somme); //conversion au format "euros"
document.querySelector(".somme").innerHTML = `${totalOrderPrice}`;

// _____________ENVOI DE LA COMMANDE AU BACKEND_____________________________________________________________

let products = []; // données de la commande, à envoyer au backend 
let contact; // données du contact, à envoyer au backend
let submit = document.getElementById("submit");

submit.addEventListener("click", function(event){
    
    event.preventDefault();

    if(inLocalStorage){
        for(let product of inLocalStorage){
            products.push(product._id)
            console.log(products);
        }
        contact = {
            firstName: document.getElementById("nom").value,
            lastName: document.getElementById("prenom").value,
            address: document.getElementById("adresse").value,
            city: document.getElementById("ville").value,
            email: document.getElementById("email").value,
        }
        console.log(contact);
    }
    
    if(products.length > 0){
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
            if(data.orderId){
                let confirmOrder = {
                    name: document.getElementById("prenom").value,
                    price: totalOrderPrice,
                    id: data.orderId
                }
                localStorage.setItem("forConfirmOrder", JSON.stringify(confirmOrder)) 
                window.open(`./confirmOrder.html`, "confirmOrderPage");

            } 
            else {
                window.alert("Chaque champ du formulaire doit être complété")
            }
        })
        .catch(error => console.log(`message d'erreur : ${error}`))
    } 
    else {
        window.alert("Le panier est vide.");
    }
 })

