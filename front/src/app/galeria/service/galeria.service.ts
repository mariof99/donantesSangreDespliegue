import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Galeria } from '../interface/galeria';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  private baseURL: string = "http://localhost:8090/api/galeria";
  comprobarPermisos: Subject<boolean>
  /* https://www.c-sharpcorner.com/article/easily-share-data-between-two-unrelated-components-in-angular/ */
  /* https://stackoverflow.com/a/51992202 */
  constructor(private http: HttpClient) {
    this.comprobarPermisos = new Subject<boolean>();
  }

  getGaleria_Imagenes(): Observable<Galeria[]> {
    return this.http.get<Galeria[]>(`${this.baseURL}/mostrarGaleria_Imagenes`);
  }

  subirFoto(archivo:FormData): Observable<FormData> {
    return this.http.post<any>(`${this.baseURL}/insertarGaleria_imagen`, archivo);
  }

  borrarImagenes(id:any): Observable<any>{
    return this.http.delete<any>(`${this.baseURL}/borrarGaleria_Imagen/${id}`);
  }



}
