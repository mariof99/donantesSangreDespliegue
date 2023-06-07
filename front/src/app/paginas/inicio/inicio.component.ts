import { Component } from '@angular/core';
import { Direccion, Horario, HorarioMostrar } from 'src/app/config/interfaces/config.interface';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  direcciones: Direccion[] = [];
  horarios: Horario[] = [];
  hMostrar: HorarioMostrar[] = [];
  citaPedida: number = -1;

  constructor(private sharedService: SharedService) { }

  //Alicia
  ngOnInit() {
    this.sharedService.citaPedida.subscribe(resp => {
      this.citaPedida = resp;
    });


    this.sharedService.getHorarios().subscribe(resp => {
      if (resp.success) this.horarios = resp.data;
    });


    this.sharedService.getDirecciones().subscribe(resp => {
      if (resp.success) this.direcciones = resp.data;
    });
  }
}
