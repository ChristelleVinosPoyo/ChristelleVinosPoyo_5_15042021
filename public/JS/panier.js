let inLocalStorage = JSON.parse(localStorage.getItem("ProductsInLocalStorage"));

let tabTotalOrder = []; // pour calcul de la somme totale de la commance

for(let product of inLocalStorage){

    // mise en forme du prix au format euros
    let cameraPrice = convertPrice(product.price);
    let cameraTotalPrice = convertPrice(product.quantity*product.price);
    
    tabTotalOrder.push(product.quantity*product.price);
    
    document.querySelector(".panier__container").innerHTML +=
    
    `<div class="camera">
        <div class="camera__name order-line">${product.name}</div>
        <div class="camera__quantity order-line">${product.quantity}</div>
        <div class="camera__price order-line">${cameraPrice}</div>
        <div class="camera__total order-line">${cameraTotalPrice}</div>
    </div>`
}
let somme = tabTotalOrder.reduce((a, b)=> a + b,0); // total de la commance en centimes
let totalOrderPrice = convertPrice(somme); //conversion au formar "euros"
document.querySelector(".somme").innerHTML = `${totalOrderPrice}`;

// _____________ENVOI DE LA COMMANDE AU BACKEND_____________________________________________________________

let products = []; // données de la commande, à envoyer au backend 
let contact; // données du contact, à envoyer au backend
let submit = document.getElementById("submit");

submit.addEventListener("click", function(event){
    event.preventDefault();
    for(let product of inLocalStorage){
        products.push(product._id)
    }
    contact = {
        firstName: document.getElementById("nom").value,
        lastName: document.getElementById("prenom").value,
        address: document.getElementById("adresse").value,
        city: document.getElementById("ville").value,
        email: document.getElementById("email").value,
     }
    //  console.log(contact);
    //  console.log(products);
    let reponse = JSON.stringify({products, contact});
    console.log(reponse);
    
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
        console.log(data);
        //let submitLink = document.querySelector(".submit-link")
        //submitLink.setAttribute("href", "./confirmOrder.html")
        window.open(`./confirmOrder.html?id=${data.orderId}`, "confirmOrderPage");
    })
    .catch(error => console.log(`message d'erreur : ${error}`))
 })

