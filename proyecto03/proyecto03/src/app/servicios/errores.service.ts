import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ErroresService {

  constructor(private http: HttpClient) { }


  obtenerErrores(){
    return this.http.get('https://storagedawm-default-rtdb.firebaseio.com/errores.json')
  }


}
