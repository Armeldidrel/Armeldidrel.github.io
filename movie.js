const frm = document.getElementById("ff");
const rch = document.querySelector(".recherche");
const load = document.createElement("div");
const modalMovie = document.createElement("div");
const fav = document.querySelector(".fvr");
var favori = [];
load.style.display = "none";
rch.appendChild(load);
load.innerHTML = `<div class="container d-flex justify-content-center py-5 ">
<div class="spinner-border mb-3 text-danger"style="width: 10rem; height: 10rem;" role="status">
</div>
</div>`;
async function IdREch(id_movie) {
  const movie = await fetch(
    "https://www.omdbapi.com/?i=" + id_movie + "&apikey=6688d157"
  );
  const film = await movie.json();
  const fav_item_card = document.createElement("div");
  fav_item_card.classList.add("mdl");
  fav_item_card.innerHTML = `<div class="col">
  <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
          <div class="col-md-4">
              <img src="${film.Poster}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
              <div class="card-body ">
                  <h5 class="card-title">${film.Title}</h5>
                  <p class="card-text">${film.Plot}.</p>
                  <button class="btn btn-warning " onclick=Del_item()>Retirer des avoris </button>

              </div>
          </div>
      </div>
  </div>
</div>`;
  fav.appendChild(fav_item_card);
}
function Del_item(){
  const mtd=document.querySelector(".mdl");
  fav.removeChild(mtd);
}
async function RechercheFilm(titre) {
  const reponse = await fetch(
    "https://www.omdbapi.com/?t=" + titre + "&apikey=6688d157"
  );
  const film = await reponse.json();
  const card = document.createElement("div");
  card.classList.add("item-card", "mx-auto", "py-4");
  if (film.Response === "False") {
    card.innerHTML = `
      <div class="align-itmes-center"></div>
        <h1 class="text-danger text-center ert">Aucun resulta trouver pour <span class="text-light">"${frm.titre.value}"</span></h1>
        <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/no-shows-found.7f82dc78.svg" width="250px" class="mx-auto d-block">
        `;
  } else {
    card.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${film.Poster}" width="100%" height="100%" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${film.Title}</h5>
          <p class="card-text">${film.Plot}</p>
          <button class="btn btn-danger " onclick="AjoutFavori('${film.imdbID}')">Ajouter au favori  <img src="10109993.png" width="20px" class="img_icon"></button>
          <button type="button" class="btn btn-secondary "data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
          </div>
    
       
  
      </div>
    </div>
  </div>`;
    modalMovie.innerHTML = `
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-dark text-center" id="staticBackdropLabel">${film.Title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="card border-light" style="width: 100%;">
  <img src="${film.Poster}"  class="mx-auto "width="150px"alt="...">
  <div class="card-body text-center ">
    <p class="card-text text-center">${film.Plot}</p>
    <p>Released :${film.Released}</p>
    <p>Genre :${film.Genre}</p>
    <p>Writer :${film.Writer}</p>
    <p">Director :${film.Director}</p>
    <p>Actors :${film.Actors}</p>
  </div>
</div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-danger " onclick="AjoutFavori('${film.imdbID}')">Ajouter au favori  <img src="10109993.png" width="20px" class="img_icon"></button>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>

      </div>
    </div>
  </div>
</div>`;
  }
  load.style.display = "none";
  document.body.appendChild(modalMovie);
  rch.appendChild(card);
}
function AjoutFavori(film_to_fav) {
  const i = document.querySelector(".img_icon");
  // if (i.src.indexOf("10109993.png") != -1) {
    i.src = "10109841.png";
    favori.push(film_to_fav);
    if(favori.length > 0){
      IdREch(getLst(favori));
    } 
  // } else {
  //   i.src = "10109993.png";
  // }
}
frm.addEventListener("submit", (e) => {
  if (frm.titre.value == "") {
  }

  e.preventDefault();
  load.style.display = "block";
  delmoveie();
  const titre = frm.titre.value;
  RechercheFilm(titre);
});

// const ii = document.querySelector(".navbar-toggler");
// ii.addEventListener("onclik", () => {
//   const dd = document.querySelector("#dki");
//   dd.style.marginTop="150px";
// });
function delmoveie() {
  const ro = document.querySelectorAll(".item-card");
  ro.forEach((i) => {
    rch.removeChild(i);
  });
}

function hideBT() {
  const hb = document.querySelector(".navbar-toggler");
  const tuf = document.querySelector("#tuf");

  hb.addEventListener("click", () => {
    tuf.classList.toggle("hdn");
  });
}

hideBT();
function inputDel() {
  frm.titre.addEventListener("input", (e) => {
    const tx = frm.titre.value;
    if (tx == "") {
      delmoveie();
    }
  });
}
inputDel();

function getLst(params) {
  return params[params.length - 1];
}
function delFav() {
  fav.removeChild(this);
}