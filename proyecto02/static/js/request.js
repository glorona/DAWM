let container;
const poketot = 151;

window.onload = init;

function generateNumber(min,max){
    return Math.floor(Math.random() * (max - min +1) + min)
}

function init(){
    container = document.getElementById("cartapoke");
    button = document.getElementById("botonpoke");
    button.addEventListener("click",fillCard);
}

function fillCard(event_poke){
    console.log("Llamada a fillcard!");
    container.innerHTML = "";
    generateRequest(generateNumber(1,poketot));

}

function generateRequest(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(function(data){
      let nombre = data.name;
      let url = data.sprites.other.dream_world.front_default;
      if(nombre && url)
      {
          makeCard(nombre,url);
      }
    });
  }
  
  function makeCard(nombre,url)
  {
    let template = `<div class="card">
    <img class="card-img-top" src="${url}" alt="pokemongenerado">
    <div class="card-header">
        <h5 class="card-title mb-0">Tu pokemon es: ${nombre}</h5>
    </div>
        <div class="card-body">
            <p class="card-text">Quieres un pokemon? Da click abajo.</p>
            <button id="botonpoke" type="button" class="btn btn-primary">Pokepls</button>
        </div>
    </div>`;
    container.innerHTML += template;
    button = document.getElementById("botonpoke");
    button.addEventListener("click",fillCard);
  }