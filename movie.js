const frm = document.getElementById("ff");
const rch = document.querySelector(".recherche");
async function RechercheFilm(titre) {
  const reponse = await fetch(
    "https://www.omdbapi.com/?t=" + titre + "&apikey=6688d157"
  );
  const film = await reponse.json();
  const card = document.createElement("div");
  card.classList.add("item-card", "container-fluid", "py-4");
  if (film.Response === "False") {
    card.innerHTML = `
      <div class="align-itmes-center"></div>
        <h1 class="text-danger ert">Aucun resulta trouver pour <span class="text-light">"${frm.titre.value}"</span></h1>
        <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/no-shows-found.7f82dc78.svg" width="250px" class="mx-auto d-block">
        `;
  } else {
    card.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
      <div class="img_b">
        <img src="${film.Poster}" width="100%" height="100%" alt="...">
      </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${film.Title}</h5>
          <p class="card-text">${film.Plot}</p>
        </div>
        <div class="card-footer  bg-transparent">
        <div class="container er" onclick=AjoutFavori()>
        <p>Ajouter au favori  </p> <img src="10109993.png" width="20px" class="img_icon">
        </div>
        </div>
      </div>
    </div>
  </div>`;
  }
  rch.appendChild(card);
}
function AjoutFavori() {
  const i = document.querySelector(".img_icon");
  if (
    i.src ===
    "file:///C:/Users/GANIA/Documents/MERN/react/react_app/src/10109993.png"
  ) {
    i.src = "10109841.png";
  } else {
    i.src = "10109993.png";
  }
}
frm.addEventListener("submit", (e) => {
  if (frm.titre.value == "") {
  }
  e.preventDefault();
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
    tuf.style.visibility = "hidden";

  });
}

hideBT();