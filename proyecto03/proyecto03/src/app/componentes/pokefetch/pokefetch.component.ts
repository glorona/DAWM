import { Component , ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PokemonRes,Pokemon,PokemonStat } from 'src/app/interfaz/pokemon';
import { ResourceService } from 'src/app/servicios/resource.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-pokefetch',
  templateUrl: './pokefetch.component.html',
  styleUrls: ['./pokefetch.component.css']
})

export class PokefetchComponent {
  
  @ViewChildren('myChart') private chartRef: any;

  myChart!: Chart;

  pokemones!: PokemonRes;
  pokemonRes: Pokemon[] = [];

  arregloNombres: string[] = [];

  arregloValores: number[] = [];
  
  chartCreated: boolean = false;

  pokeObtained!: Pokemon;

  pokeObtainedFull!: PokemonStat;
  
  
  ngAfterViewInit() {
    
    const {name} = this.route.snapshot.params;

    if(name !== undefined){
      console.log("condicion")
      console.log(name)
      this.obtenerDatos(name,this.resourceservice)

      let context = this.chartRef.nativeElement;
      this.myChart = new Chart(context, {
        type: 'radar', //this denotes tha type of chart
  
        data: {
          labels: this.arregloNombres,
          
          datasets: [{
            label: "Statistics",
            data: this.arregloValores,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
          }]
        },
        options:{
          
          plugins: {
            legend: {
                display: false
            },

            
          },
          
        }
  
    });
      this.chartCreated = true;

    }
  }

  constructor(private resourceservice:ResourceService,private route: ActivatedRoute,private router: Router) {
    resourceservice.obtenerDatos().subscribe(respuesta => {
      this.pokemones = respuesta as PokemonRes
      this.pokemonRes = this.pokemones["results"]
    })

    const {name} = this.route.snapshot.params;
    
    if(name !== undefined){
      
      this.obtenerDatos(name,this.resourceservice)
    }

    

  }

  obtenerAleatorio(arreglo:Pokemon[]){
    const random = Math.floor(Math.random() * arreglo.length);
    this.pokeObtained = arreglo[random]
    this.obtenerDatos(this.pokeObtained.name, this.resourceservice)
  }

  obtenerDatos(pokemon:string, resourceservice:ResourceService){
    resourceservice.obtenerDatosPokedex(pokemon).subscribe(respuesta => {
      this.arregloNombres = [];
      this.arregloValores = [];
      this.pokeObtainedFull = respuesta as PokemonStat
      for(var estadi of this.pokeObtainedFull.stats){
        var nombre = estadi.stat.name
        var valor = estadi.base_stat

        this.arregloNombres.push(nombre)
        this.arregloValores.push(valor)
      }

      
      if(this.chartCreated){
        this.myChart.destroy();
        this.chartCreated = false;
      }
      this.myChart = new Chart("myChart", {
        type: 'radar', //this denotes tha type of chart
  
        data: {
          labels: this.arregloNombres,
          
          datasets: [{
            label: "Statistics",
            data: this.arregloValores,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
          }]
        },
        options:{
          
          plugins: {
            legend: {
                display: false
            },

            
          },
          
        }
  
    });
      this.chartCreated = true;


      
    
    })
  }

 
}
