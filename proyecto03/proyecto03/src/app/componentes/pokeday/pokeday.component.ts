import { Component } from '@angular/core';
import { PokemonRes,Pokemon,PokemonStat } from 'src/app/interfaz/pokemon';
import { ResourceService } from 'src/app/servicios/resource.service';
@Component({
  selector: 'app-pokeday',
  templateUrl: './pokeday.component.html',
  styleUrls: ['./pokeday.component.css']
})
export class PokedayComponent {

  pokemones!: PokemonRes;
  pokemonRes: Pokemon[] = [];

  ability: any;
  valuestats: any[] = [];

  gen: any;
  move: any;

  pokeName: string = "eevee";
  pokeObtained!: Pokemon;

  pokeObtainedFull!: PokemonStat;


  constructor(private resourceservice:ResourceService) {
    resourceservice.obtenerDatos().subscribe(respuesta => {
      this.pokemones = respuesta as PokemonRes
      this.pokemonRes = this.pokemones["results"]
      this.obtenerDatosPokeDay(this.resourceservice)
    })
  }


  obtenerDatosPokeDay(resourceservice:ResourceService){
    resourceservice.obtenerDatosPokedex(this.pokeName).subscribe(respuesta => {
      this.pokeObtainedFull = respuesta as PokemonStat

      this.ability = this.pokeObtainedFull.abilities[0].ability.name

      this.move = this.pokeObtainedFull.moves[0].move.name
      
      if(this.pokeObtainedFull.id >= 0 && this.pokeObtainedFull.id >= 151){
        this.gen = 1;
      }
      else if(this.pokeObtainedFull.id <= 251){
        this.gen = 2;
      }
      else if(this.pokeObtainedFull.id <= 386){
        this.gen = 3;
      }
      else if(this.pokeObtainedFull.id <= 493){
        this.gen = 4;
      }
      else if(this.pokeObtainedFull.id <= 649){
        this.gen = 5;
      }
      else if(this.pokeObtainedFull.id <= 721){
        this.gen = 6;
      }
      else if(this.pokeObtainedFull.id <= 809){
        this.gen = 7;
      }
      else if(this.pokeObtainedFull.id <= 905){
        this.gen = 8;
      }
      else if(this.pokeObtainedFull.id <= 1008){
        this.gen = 9;
      }

  });

  

  }
}


