let inLocalStorage = JSON.parse(localStorage.getItem("ProductsInLocalStorage"));

let tabTotalOrder = []; // pour calcul de la somme totale de la commance

for(let product of inLocalStorage){

    // mise en forme du prix au format euros
    let cameraPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price/100);
    let cameraTotalPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.quantity*product.price/100);
    
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
let totalOrderPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(somme/100); //conversion au formar "euros"
document.querySelector(".somme").innerHTML = `${totalOrderPrice}`;


