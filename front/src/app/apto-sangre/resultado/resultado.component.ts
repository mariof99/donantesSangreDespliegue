import { Component, OnInit } from '@angular/core';
import { aptosangreService } from '../servicio/apto-sangre.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit{
  constructor(public apto_servicio: aptosangreService) { }

  mensaje_respuesta: string[] = [];

  ngOnInit(): void {
      this.apto_servicio.preguntasEnviadas[1].forEach((respuesta: any) => {
        if(respuesta == 0){
          this.mensaje_respuesta.push("No");
        }
        else{
          this.mensaje_respuesta.push("Si");
        }
      });
  }
}
