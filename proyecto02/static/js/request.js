let container;
let container2;
let container3;
let containerchart1;
const poketot = 900;
let numberfetch = 1; //cantidad de requests 
let errorno = 0; //numero de pokemones con null en la imagen
let mapatypes;
let mapagen;
let arrtipos;
let genini;
let classad = '';
let padd = '';
let fmove;
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

    containerchart1 = document.getElementById("pokedchart1");
    container3 = document.getElementById("pokechart");
}

function fillCard(event_poke){
    console.log("Llamada a fillcard!");
    container.innerHTML = "";
    mapagen = new Map();
    mapagen.set('Generación 1',0); mapagen.set('Generación 2',0); mapagen.set('Generación 3',0); mapagen.set('Generación 4',0); mapagen.set('Generación 5',0); mapagen.set('Generación 6',0); mapagen.set('Generación 7',0); mapagen.set('Generación 8',0); mapagen.set('Generación 9',0); 
    mapatypes = new Map();
    generateRequest(generateNumber(1,poketot),false);

}

function updateNumber(){
    numbers.innerHTML = numberfetch++;
}

function fillTable(event_pokemany){
    console.log("Llamada a filltable!");
    container2.innerHTML = "";
    mapagen = new Map();
    mapagen.set('Generación 1',0); mapagen.set('Generación 2',0); mapagen.set('Generación 3',0); mapagen.set('Generación 4',0); mapagen.set('Generación 5',0); mapagen.set('Generación 6',0); mapagen.set('Generación 7',0); mapagen.set('Generación 8',0); mapagen.set('Generación 9',0);
    mapatypes = new Map();
    for(let i=0; i<25; i++){
        generateRequest(generateNumber(1,poketot),true);
    }
    createChart1(mapagen);
}

function generatep(arrtype){
    padd = '';
    for(let tipo of arrtype){
        let tipoclass = tipo.charAt(0).toLowerCase() + tipo.slice(1);
        padd+= `<p class=${tipoclass}>${tipo}</p>`
    }
}

function generateRequest(id,validation){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(function(data){
      readData(data); //obtener datos de arreglo
      let nombre = data.name;
      nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      nombre = nombre.split("-")
      nombre = nombre[0]
      generatep(arrtipos)
      console.log(padd)
      let url = data.sprites.other.dream_world.front_default;
      if(validation)
      {
          makeCell(id,nombre,arrtipos);
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
        <h3 class="card-title mb-0">Tipos:</h3>` + padd + `
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
    <td class="pokedex">${id}</td>
    <td class="d-none d-xl-table-cell name">${nombre}</td>
    <td class="d-flex d-xl-table-cell type ${classad}">` + padd + `</td>
    <td><class="d-none d-md-table-cell fmove">${fmove}</span></td>
    <td class="d-none d-xl-table-cell gen">${genini}</td>
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
    //Para los datos de los cuadros y la tabla
    //Tipos
    arrtipos = [];
    classad = ''
    for (tipo in datos.types){
        classad+= datos.types[tipo].type.name + ' '
        let typeind = datos.types[tipo].type.name
        typeind = typeind.charAt(0).toUpperCase() + typeind.slice(1);
        arrtipos.push(typeind)
        if (mapatypes.has(typeind)){
            mapatypes.set(typeind,mapatypes.get(typeind)+1);
        }
        else{
            mapatypes.set(typeind,1);
        }
    }
    //extraeremos generacion por numero de pokedex
    let pokeid = datos.id
    if (range(1,151).includes(pokeid)){
        genini = 'Generación 1'
    }
    else if(range(1,251).includes(pokeid)){
        genini = 'Generación 2'
    }
    else if(range(1,386).includes(pokeid)){
        genini = 'Generación 3'
    }
    else if(range(1,493).includes(pokeid)){
        genini = 'Generación 4'
    }
    else if(range(1,649).includes(pokeid)){
        genini = 'Generación 5'
    }
    else if(range(1,721).includes(pokeid)){
        genini = 'Generación 6'
    }
    else if(range(1,809).includes(pokeid)){
        genini = 'Generación 7'
    }
    else if(range(1,905).includes(pokeid)){
        genini = 'Generación 8'
    }
    else if(range(1,1008).includes(pokeid)){
        genini = 'Generación 9'
    }
    
    mapagen.set(genini,mapagen.get(genini)+1)
    console.log(mapagen)
    //movimiento
    fmove = datos.moves[0].move.name
    fmove = fmove.charAt(0).toUpperCase() + fmove.slice(1);
  }

function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => i)
  }

function createChart1(mapa){
    container3.innerHTML = '';
    let legendchart = `<ul class="charts-css legend legend-circle>`;
    let template_row = ``;
    for(let llave of mapa.keys()){
        let valor = mapa.get(llave)
        legendchart+=`<li> ${llave} </li>`
        template_row+=`<tr> 
            <td> ${valor} </td> 
            </tr>`

    }

    legendchart+= `</ul>`
    container3.innerHTML += template_row;
    
    


}