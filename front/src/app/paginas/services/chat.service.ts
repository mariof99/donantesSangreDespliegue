import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable, tap } from 'rxjs';
import { Mensaje, ResponseMensaje } from '../interfaces/paginas.interface';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = environment.baseUrl;
  private mensajes: Mensaje[];
  private listaConectados: String[];

  constructor(private http: HttpClient) {
    this.mensajes = [];
    this.listaConectados = [];
  }
  get resultMensajes() {
    return [...this.mensajes];
  }
  get resultConectados() {
    return [...this.listaConectados];
  }
  getListadoMensajes(): Observable<ResponseMensaje> {
    return this.http.get<ResponseMensaje>(`${this.baseUrl}/api/chat/listado`).pipe(tap(resp => { if (resp.success !== false) { this.mensajes = resp.data } }))
  }

  addMensaje(mensaje: Mensaje): Observable<ResponseMensaje> {
    return this.http.post<ResponseMensaje>(`${this.baseUrl}/api/chat/add`, mensaje);
  }
  agregarMensaje(mensaje: Mensaje): void {
    this.mensajes.push(mensaje);

  }
  setListaConectados(lista: string[]) {
    this.listaConectados = lista;
  }

  agregarConectado(usuario: string): void {
    this.listaConectados.push(usuario);
  }
  borrarConectado(usuario: string): void {
    let lista = this.listaConectados.filter((u) => u !== usuario);
    this.listaConectados = lista;
  }


}
