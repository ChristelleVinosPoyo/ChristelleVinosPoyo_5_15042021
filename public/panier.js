let inLocalStorage = JSON.parse(localStorage.getItem("ProductsInLocalStorage"));
console.log(inLocalStorage);

for(let product of inLocalStorage){
    document.querySelector(".panier__container").innerHTML +=
    
    `<div class="camera">
        <div class="camera__name order-line">${product.name}</div>
        <div class="camera__quantity order-line">${product.quantity}</div>
        <div class="camera__price order-line">${product.price}€</div>
        <div class="camera__total order-line">${product.quantity*product.price}€</div>
    </div>

    <div class="total-order">
    </div>`
}

// somme TOTAL de la commande _____________________________

let cameraTotal = document.querySelectorAll(".camera__total"); // la methode reduce ne peut pas être appliquée directement au tableau cameraTotal
let tabCameraTotal = []; // création d'un tableau simple qui ne contiendra que les prix (innerHtml récupérés avec la boucle ci dessous)
for (let object of cameraTotal){
    let price = parseFloat(object.innerHTML); //object.innerHTML est une chaine de caractère. Convertis en nombre avec parseFloat
    tabCameraTotal.push(price)
}
let somme = tabCameraTotal.reduce((a, b)=> a + b,0); 
console.log(somme);

document.querySelector(".somme").innerHTML = `${somme}`;
