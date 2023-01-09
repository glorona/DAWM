import { Component } from '@angular/core';
import { PokemonRes,Pokemon,PokemonStat } from 'src/app/interfaz/pokemon';
import { ResourceService } from 'src/app/servicios/resource.service';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.css']
})
export class PokelistComponent {

  pokemones!: PokemonRes;
  pokemonRes: Pokemon[] = [];

  pokeObtained!: Pokemon;

  pokeObtainedFull!: PokemonStat;

  arreglo1: PokemonStat[] = [];

  arreglo2: PokemonStat[] = [];

  constructor(private resourceservice:ResourceService) {
    resourceservice.obtenerDatos().subscribe(respuesta => {
      this.pokemones = respuesta as PokemonRes
      this.pokemonRes = this.pokemones["results"]
    })
  }

  obtenerAleatorios(arreglo:Pokemon[]){
    this.arreglo1 = [];
    this.arreglo2 = [];

    for(let i = 0;i<12;i++){
    const random = Math.floor(Math.random() * arreglo.length);
    this.pokeObtained = arreglo[random]
    this.obtenerDatosArr1(this.pokeObtained.name, this.resourceservice)
    }

    for(let i=0;i<13;i++){
      const random = Math.floor(Math.random() * arreglo.length);
      this.pokeObtained = arreglo[random]
      this.obtenerDatosArr2(this.pokeObtained.name, this.resourceservice)


    }

    console.log(this.arreglo1)

  }


  obtenerDatosArr1(pokemon:string, resourceservice:ResourceService){
    resourceservice.obtenerDatosPokedex(pokemon).subscribe(respuesta => {
      this.pokeObtainedFull = respuesta as PokemonStat
      this.arreglo1.push(this.pokeObtainedFull)
  });

  

  }

  obtenerDatosArr2(pokemon:string, resourceservice:ResourceService){
    resourceservice.obtenerDatosPokedex(pokemon).subscribe(respuesta => {
      this.pokeObtainedFull = respuesta as PokemonStat
      this.arreglo2.push(this.pokeObtainedFull)
  });
}

}
