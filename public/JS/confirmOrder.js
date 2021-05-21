let inLocalStorage = JSON.parse(localStorage.getItem("forConfirmOrder"));

document.querySelector(".order").innerHTML = 
    `<h1 class="purchase-order">Merci ${inLocalStorage.name} pour votre commande d'un montant de ${inLocalStorage.price}.</h1>
    <p class="order-id"></p>
    <p>id de votre commande : <strong>${inLocalStorage.id}</strong></p>
    <p> Nous la traitons dans les plus brefs délais. <br>
        Pour toute question, contactez-nous par mail à <strong>contact@oricamera.com</strong>
    </p>
    `;

localStorage.clear();
