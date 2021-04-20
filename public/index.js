const urlApi = "http://localhost:3000/api/cameras/";
//pour appeler un objet via l'API, il faut mettre le num de l'id après l'url de api :
const objet0 = "http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061";
let resultatsAPI;
const imgProduit0 = document.querySelector(".img-produit0");
const imgProduit1 = document.querySelector(".img-produit1");
const imgProduit2 = document.querySelector(".img-produit2");
const imgProduit3 = document.querySelector(".img-produit3");
const imgProduit4 = document.querySelector(".img-produit4");

fetch(urlApi)
.then((response) => {
    return response.json();
})
.then((data) => {
    //console.log(data);
    resultatsAPI = data;
    console.log(resultatsAPI);
    imgProduit0.setAttribute("src", resultatsAPI[0].imageUrl);
    imgProduit1.setAttribute("src", resultatsAPI[1].imageUrl);
    imgProduit2.setAttribute("src", resultatsAPI[2].imageUrl);
    imgProduit3.setAttribute("src", resultatsAPI[3].imageUrl);
    imgProduit4.setAttribute("src", resultatsAPI[4].imageUrl);
})

// page Camera0 _______________________________________________________

//paneau déroulant pour affichier les options de lentilles
const options = document.querySelector(".options");
const optionsLi = document.querySelector(".camera0__options li")

options.addEventListener("click", function(){
    optionsLi.style.display = "block"
})
 