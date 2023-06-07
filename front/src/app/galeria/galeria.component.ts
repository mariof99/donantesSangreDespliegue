import { Component, ViewChild, ElementRef, Renderer2, OnInit, SimpleChanges } from '@angular/core';
import { GaleriaService } from './service/galeria.service';
import { Galeria } from './interface/galeria';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit{
  p: number = 1;
  imagenesSeleccionadas: any[] = [];
  galeria_imagenes: Galeria[] = [];
  puedeModificar: boolean = false;
  estaRegistrado: boolean = false;

  constructor(public galeriaServicio: GaleriaService, private AuthService: AuthService) { }




  ngOnInit(): void {
    this.galeriaServicio.getGaleria_Imagenes().subscribe( imagen => {this.galeria_imagenes = imagen});


    const user = localStorage.getItem('user');
    if (user) {
      this.estaRegistrado = true;

      this.comprobarPuedeModificar();
    }

    this.galeriaServicio.comprobarPermisos.subscribe((registrado:boolean) => {
      this.estaRegistrado = registrado;

      this.comprobarPuedeModificar();
    })

  }




  eliminandoFotos(): void{

    this.imagenesSeleccionadas.forEach(id => {
      this.galeriaServicio.borrarImagenes(id).subscribe((res) => {
        this.mostrarImagenes();
      })
    })

  }

  mostrarImagenes(): void{
    this.galeriaServicio.getGaleria_Imagenes().subscribe( imagen => {this.galeria_imagenes = imagen});
  }

  fotoSeleccionada(event: any): void{
    if(event.target.type == 'checkbox'){
      if(event.target.checked){
        this.imagenesSeleccionadas.push(event.target.id);
      }
      else{
        let i = this.imagenesSeleccionadas.indexOf(event.target.id);
        this.imagenesSeleccionadas.splice(i, 1);
      }
    }
  }




  comprobarPuedeModificar() {
    if (this.estaRegistrado) {
      this.AuthService.puedeModificar().subscribe((resp:boolean) => {
        this.puedeModificar = (resp) ? true : false;
      });
    }
  }
}
