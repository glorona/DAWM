let container;
const poketot = 900;
let numberfetch = 1; //cantidad de requests 
let errorno = 0; //numero de pokemones con null en la imagen
window.onload = init;

function generateNumber(min,max){
    return Math.floor(Math.random() * (max - min +1) + min)
}

function init(){
    container = document.getElementById("cartapoke");
    button = document.getElementById("botonpoke");
    button.addEventListener("click",fillCard);

    
    numbers = document.getElementById("numberfetch");

    container2 = document.getElementById("bodytablepoke");
    button2 = document.getElementById("botonpokemany");
    button2.addEventListener("click",fillTable);
}

function fillCard(event_poke){
    console.log("Llamada a fillcard!");
    container.innerHTML = "";
    generateRequest(generateNumber(1,poketot),false);

}

function updateNumber(){
    numbers.innerHTML = numberfetch++;
}

function fillTable(event_pokemany){
    console.log("Llamada a filltable!");
    container2.innerHTML = "";
    for(let i=0; i<25; i++){
        generateRequest(generateNumber(1,poketot),true);
    }

}

function generateRequest(id,validation){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(function(data){
      readData(data);
      let nombre = data.name;
      nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      nombre = nombre.split("-")
      nombre = nombre[0]
      let url = data.sprites.other.dream_world.front_default;
      if(validation)
      {
          makeCell(id,nombre,url);
      }
      else{
        makeCard(nombre,url);
      }
    });
  }
  
  function makeCard(nombre,url)
  {
    let template = `<div class="card">
    <img class="card-img-top" id="img-gen1" src="${url}" alt="pokemongenerado">
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
    updateNumber();
  }


  function makeCell(id,nombre,url)
  {
    let template = `<tr>
    <td>${id}</td>
    <td class="d-none d-xl-table-cell">${nombre}</td>
    <td class="d-none d-xl-table-cell">31/06/2021</td>
    <td><span class="badge bg-success">Done</span></td>
    <td class="d-none d-md-table-cell">Vanessa Tucker</td>
    </tr>`;
    container2.innerHTML += template;
    button2 = document.getElementById("botonpokemany");
    button2.addEventListener("click",fillTable);
    updateNumber();
  }

  function readData(datos){
    if(datos.sprites.other.dream_world.front_default == null){
        errorno++;
    }
    //Extraer datos necesarios
    //Para los datos de los cuadros 

  }