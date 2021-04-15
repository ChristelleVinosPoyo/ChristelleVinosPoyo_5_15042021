const urlApi = "http://localhost:3000/api/cameras/";
//pour appeler un objet camera, mettre le num de l'id après l'url de api
const objet0 = "http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061";
let resultatsAPI;
const eltTest = document.querySelector(".test")
const bannerImg = document.getElementById("banner__img");

fetch(urlApi)
.then((response) => {
    return response.json();
})
.then((data) => {
    //console.log(data);
    resultatsAPI = data;
    console.log(resultatsAPI);
    //eltTest.innerText = resultatsAPI[0].description;
    //console.log(eltTest);
    bannerImg.setAttribute("src", resultatsAPI[4].imageUrl);
})



