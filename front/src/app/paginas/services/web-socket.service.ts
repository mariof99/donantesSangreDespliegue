import { Injectable, EventEmitter, Output } from '@angular/core';
import { ResponseComentario, Mensaje, ResponseListaConectados } from '../interfaces/paginas.interface';
import { Socket } from 'ngx-socket-io';
import { ChatService } from './chat.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  @Output() usuariosConectados: EventEmitter<string[]> = new EventEmitter();
  @Output() conectarChat: EventEmitter<string[]> = new EventEmitter();

  constructor(private ChatService: ChatService) {
    let datos: any = "";
    if (localStorage.getItem('user') != null) {
      datos = JSON.parse(localStorage.getItem('user') || "");
    }
    super({
      url: environment.socketUrl,
      options: {
        query: {
          payload: datos.nombre
        }
      }

    });
    this.ioSocket.on('enviar-mensaje', (res: any) => this.outEven.emit(res));
    this.ioSocket.on('usuario-conectado', (usuarios: string[]) => this.usuariosConectados.emit(usuarios));
  }

  emitEventInicioSesion = (event = 'iniciarSesion', payload = {}) => {
    this.ioSocket.emit('iniciarSesion', {
      payload
    }, (respuesta: ResponseListaConectados) => {
      if (respuesta.success) {

        this.ChatService.setListaConectados(respuesta.data);
      }
    });
  }
  emitEventLista = (event = 'lista', payload = {}) => {
    this.ioSocket.emit('lista', {
      payload
    }, (respuesta: ResponseListaConectados) => {
      if (respuesta.success) {

        this.ChatService.setListaConectados(respuesta.data);
      }
    });
  }
  emitEvent = (event = 'enviar-mensaje', payload = {}) => {
    this.ioSocket.emit('enviar-mensaje', {
      payload
    }, (respuesta: ResponseComentario) => {
      if (respuesta.success) {
        let m: Mensaje = {
          "nombre": respuesta.data.nombre,
          "mensaje": respuesta.data.mensaje,
          "idUser": respuesta.data.idUser,
          "fecha": respuesta.data.fecha,
          "hora": respuesta.data.hora,
        }
        this.ChatService.agregarMensaje(m);
      }
    });
  }
  emitEventDesconectar = (event = 'logout', payload = {}) => {
    this.ioSocket.emit('logout', {
      payload
    }, (respuesta: ResponseListaConectados) => {
      if (respuesta.success) {
        this.ChatService.setListaConectados(respuesta.data);
      }
    });
  }

  emitEventConectarChat = (payload: string) => {
    this.ioSocket.emit('conectar-chat', { payload }, (respuesta: string[]) => {
      this.ChatService.setListaConectados(respuesta);
    });
  }
}
