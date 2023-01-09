import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }


  obtenerDatos(){
    return this.http.get('https://pokeapi.co/api/v2/pokemon-species?limit=900/json')
  }



  obtenerDatosPokedex(name: string){

    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + name)

  }
}
