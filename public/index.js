//pour appeler un objet via l'API, il faut mettre le num de l'id après l'url de api :
const objet0 = "http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061";

fetch("http://localhost:3000/api/cameras/")
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
    for(let product of data){
        document.querySelector(".range__container").innerHTML +=
        `<a href="./product.html?${product._id}"> 
        <div class="card">
            <div class="card__img">
                <img src=${product.imageUrl} alt="Photo d'un appareil photo argentique vintage">
            </div>
            <div class="card__content">
                <h3>${product.name}</h3>
                <span>${product.price} €</span>
            </div>
        </div>
    </a>`
    }
})


// page Camera0 _____________________________________________

//Essai paneau déroulant pour affichier les options de lentilles
const options = document.querySelector(".options");
const optionsLi = document.querySelectorAll(".camera0__options li")

options.addEventListener("click", function(){
    optionsLi.style.display = "block"
})
 