import { Component } from '@angular/core';
import { Error } from 'src/app/interfaz/error';
import { ErroresService } from 'src/app/servicios/errores.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  menu(enlaces: any) {
    enlaces.toggle()
  }
  today = (new Date()).getDay();
  dia_actual!: Error;
  error: Error[] = [];


  constructor(private errores:ErroresService) {
  errores.obtenerErrores().subscribe(respuesta => {
    this.error = respuesta as Array<Error>;
    this.dia_actual = this.error[this.today]
    
  })



  }


}
