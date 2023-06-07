import { HttpRequest } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GaleriaService } from '../service/galeria.service';

@Component({
  selector: 'app-add-imagen',
  templateUrl: './add-imagen.component.html',
  styleUrls: ['./add-imagen.component.scss']
})
export class AddImagenComponent implements OnInit{
  public filedata:any;
  public previsualizacion: string = "";
  public archivos:any = [];
  public loading:boolean = false;
  @Output() recargarImagenes = new EventEmitter();
  constructor(private sanitizer: DomSanitizer, public galeriaServicio: GaleriaService) { }

  ngOnInit(): void {

  }
  capturarFile(event: any) {
    const archivoCapturado = event.target.files[0];
    if(archivoCapturado.type == 'image/jpg' || archivoCapturado.type == 'image/gif' || archivoCapturado.type == 'image/png'
    || archivoCapturado.type == 'image/jpeg' || archivoCapturado.type == 'image/tiff' || archivoCapturado.type == 'image/svg' || archivoCapturado.type == 'image/webp'){
      this.extraerBase64(archivoCapturado).then((imagen: any)=> {
        this.previsualizacion = imagen.base;
      })
      this.archivos.push(archivoCapturado);
    }

  }

  extraerBase64 = async (event: any) => new Promise((resolve, reject) => {
    try{
      const unsafeImg = window.URL.createObjectURL(event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL(event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return reader;
    } catch (err) {
      return null;
    }
  })

  subirFoto(): any {
    try{
      this.loading = true;
      let formularioDeDatos = new FormData();

      this.archivos.forEach((archivo: File) => {
        formularioDeDatos = new FormData();
        formularioDeDatos.append('archivo', archivo);
      })
      if(this.archivos.length > 0){
        this.galeriaServicio.subirFoto(formularioDeDatos)
        .subscribe((res) => {

          this.loading = false;
          this.recargarImagenes.emit();

        })
      }

    } catch (e) {
      this.loading = false;
    }
  }
}
