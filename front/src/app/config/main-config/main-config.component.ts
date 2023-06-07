import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-config',
  templateUrl: './main-config.component.html',
  styleUrls: ['./main-config.component.scss']
})
export class MainConfigComponent {

  public elementos = [
    {
      nombre : "hermandad",
      icono: "fa-hand-holding-droplet"
    },
    {
      nombre : "teléfonos",
      icono: "fa-phone"
    },
    {
      nombre : "himno",
      icono: "fa-headphones"
    },
    {
      nombre : "test-apto",
      icono: "fa-vial"
    },
    {
      nombre : "faq",
      icono: "fa-circle-question"
    },
    {
      nombre: "citas",
      icono: "fa-calendar"
    }
  ];


  public elementoActivo = this.elementos.map(e => this.getNombreSinTildes(e.nombre)).indexOf(this.router.url.split('/').pop()!);


  constructor(private router: Router){ }


  getNombre(nombre: string) {
    return nombre.normalize("NFD").replace(/\u002D/g, ' ');
  }


  getNombreSinTildes(nombre: string) {
    return nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
