import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LaHermandadService } from '../services/la-hermandad.service';
import { Historia, MensajeInf } from '../interfaces/la-hermandad.interface';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-config-historia',
  templateUrl: './config-historia.component.html',
  styleUrls: ['./config-historia.component.scss']
})
export class ConfigHistoriaComponent { //Alicia

  @ViewChild('closeModal') closeModal!: ElementRef;
  @Output() mensaje: EventEmitter<MensajeInf> = new EventEmitter<MensajeInf>();

  timer: NodeJS.Timeout | undefined;
  historia: Historia = { id: -1, nombre: 'historia', valor: '' };
  editorTextoConfig: AngularEditorConfig = {
    editable: true,
    height: '400px',
    minHeight: '400px',
    maxHeight: '400px',
    width: '100%',
    minWidth: '100%',
    defaultParagraphSeparator: '',
    outline: false,
    sanitize: true,
    toolbarHiddenButtons: [['fontName']]
  };


  constructor(private hermandadService: LaHermandadService) {}


  ngOnInit() {
    this.hermandadService.getHistoria()
      .subscribe(resp => {
        if (resp.success) this.historia = resp.data;
      });
  }


  updateHistoria() {
    this.hermandadService.updateHistoria(this.historia)
      .subscribe(resp => {

        if (resp.success) {
          this.historia = resp.data;
          this.mensaje.emit({ exito: true, msg: 'Éxito al actualizar la historia'});

        } else this.mensaje.emit({ exito: false, msg: 'Error al actualizar la historia'});

        this.closeModal.nativeElement.click();
      })
  }
}
