let container;
let container2;
let container3;
let containerchart1;
const poketot = 900;
var numberfetch = 1; //cantidad de requests 
var errorno = 0; //numero de pokemones con null en la imagen
var mapatypes;
var mapagen;
let arrtipos;
let genini;
let classad = '';
let padd = '';
let fmove;
var contador = 0;
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

    botonfiltro = document.getElementById("actboton")
    botonfiltro.addEventListener("click",updateChart)
}

function updateChart(event_poke){
    var tag_gen = document.getElementById("gen")
    var tag_tipo = document.getElementById("tipo")

    var valor_gen = tag_gen.checked;
    var valor_tipo = tag_tipo.checked;
    var charCreado = false
    if(valor_gen){
        if(charCreado){
            myChart.update()
        }
        else{
            charCreado = true
            createChart1(mapagen)
            
        }
        
    }
    if(valor_tipo){
        if(charCreado){
            myChart.update()
        }
        else{
            charCreado = true
            createChart1(mapatypes)
            
        }
    }

}

function fillCard(event_poke){
    console.log("Llamada a fillcard!");
    container.innerHTML = "";
    mapagen = new Map();
    mapagen.set('Generación 1',0); mapagen.set('Generación 2',0); mapagen.set('Generación 3',0); mapagen.set('Generación 4',0); mapagen.set('Generación 5',0); mapagen.set('Generación 6',0); mapagen.set('Generación 7',0); mapagen.set('Generación 8',0); mapagen.set('Generación 9',0); 
    mapatypes = new Map();
    generateRequest(generateNumber(1,poketot),false);

}


function reiniciaCanvas1(){
    chartcontainer = document.getElementById("chartcontainer1");
    let template = `<canvas id="pokechart1" class="animate__animated animate__bounce"></canvas>`
    chartcontainer.innerHTML = template

}
function reiniciaCanvas2(){
    chartcontainer = document.getElementById("chartcontainer2");
    let template = `<canvas id="pokechart2" class="animate__animated animate__bounce"></canvas>`
    chartcontainer.innerHTML = template;
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
      let url = data.sprites.other.dream_world.front_default;
      if(validation)
      {
          makeCell(id,nombre,arrtipos);
      }
      else{
        makeCard(nombre,url);
      }
      contador++;
      var charcreado2 = false
      if (contador>=24){
        if(charcreado2){
            myChart.update()
        }
        else{
        contador = 0;
        charcreado2 = true
        createChart1(mapagen);
        }
      }
      
    });
  }
  
  function makeCard(nombre,url)
  {
    let template = `<div class="card animate__animated animate__bounce" id = "containerpokemon1">
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

    let template = `<tr class="animate__animated animate__fadeInRight">
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
        console.log(errorno)
        var chartCreado = false;
        if (errorno > 0){
            if(chartCreado){
                myChart2.update()
            }
            else{
            chartCreado = true;
            createChart2(errorno,numberfetch)
            
            }
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
    //movimiento
    fmove = datos.moves[0].move.name
    fmove = fmove.charAt(0).toUpperCase() + fmove.slice(1);
  }

function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => i)
  }

function createChart1(mapa,valorbool){
    reiniciaCanvas1();
    console.log("Llamando a crear chart!")
    let keys = Array.from(mapa.keys())
    let values = Array.from(mapa.values())
    const ctx = document.getElementById("pokechart1");
        var myChart = new Chart(ctx, {
          type: "horizontalBar",
          data: {
            labels: keys,
            datasets: [
              {
                
                data: values,
                lineTension: 0,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)',
                  'rgba(255, 90, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)'
                 
                ],
                borderColor:  [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)',
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)'
                  
                ],
                borderWidth: 2,
                pointBackgroundColor: "#007bff",

              },
            ],
          },
          options: {
            indexAxis: 'y',
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
          },
        });
}

function createChart2(errorno,numberfetch){
    reiniciaCanvas2();
    console.log("Llamando a crear chart 2!")
    const ctx = document.getElementById("pokechart2");
        var myChart2 = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Errores","Generaciones correctas"],
                datasets: [{
                    data: [errorno,numberfetch],
                    backgroundColor: [
                        window.theme.primary,
                        window.theme.warning,
                        window.theme.danger
                    ],
                    borderWidth: 5
                }]
            },
            options: {
                responsive: !window.MSInputMethodContext,
                maintainAspectRatio: false,
                legend: {
                    display: true
                },
                cutoutPercentage: 75
            }
        });
}


/*
document.addEventListener("DOMContentLoaded", function() {
    // Pie chart
    new Chart(document.getElementById("chartjs-dashboard-pie"), {
        type: "pie",
        data: {
            labels: ["Chrome", "Firefox", "IE"],
            datasets: [{
                data: [4306, 3801, 1689],
                backgroundColor: [
                    window.theme.primary,
                    window.theme.warning,
                    window.theme.danger
                ],
                borderWidth: 5
            }]
        },
        options: {
            responsive: !window.MSInputMethodContext,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            cutoutPercentage: 75
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Bar chart
    new Chart(document.getElementById("chartjs-dashboard-bar"), {
        type: "bar",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "This year",
                backgroundColor: window.theme.primary,
                borderColor: window.theme.primary,
                hoverBackgroundColor: window.theme.primary,
                hoverBorderColor: window.theme.primary,
                data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
                barPercentage: .75,
                categoryPercentage: .5
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    stacked: false,
                    ticks: {
                        stepSize: 20
                    }
                }],
                xAxes: [{
                    stacked: false,
                    gridLines: {
                        color: "transparent"
                    }
                }]
            }
        }
    });
});

*/