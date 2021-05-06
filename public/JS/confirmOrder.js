let params = (new URL(document.location)).searchParams; // pour récupérer les paramètres de l'URL
let id = params.get('id'); // pour récupérer l'id présent dans l'URL
console.log(id);

document.querySelector(".order-id").innerHTML = 
`id de votre commande  : ${id}`
