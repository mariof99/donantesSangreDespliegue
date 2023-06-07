import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CargoResponse, Historia, HistoriaResponse, IntDeleteResponse, Integrante, IntsJuntaResponse, IntUpdateInsertResponse } from '../interfaces/la-hermandad.interface';



@Injectable({
  providedIn: 'root'
})
//Alicia
export class LaHermandadService {

  baseUrl = `${environment.baseUrl}/api`;


  constructor(private http: HttpClient) { }


  getHistoria(): Observable<HistoriaResponse> {
    return this.http.get<HistoriaResponse>(`${this.baseUrl}/getHistoria`);
  }


  updateHistoria(historia: Historia): Observable<HistoriaResponse> {
    const header = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': JSON.parse(localStorage.getItem('user')!).token
    })};

    return this.http.put<HistoriaResponse>(`${this.baseUrl}/updateHistoria`, historia, header);
  }


  getIntegrantesCargo(): Observable<IntsJuntaResponse> {
    return this.http.get<IntsJuntaResponse>(`${this.baseUrl}/getIntegrantesCargo`);
  }


  getCargosJunta(): Observable<CargoResponse> {
    return this.http.get<CargoResponse>(`${this.baseUrl}/getCargosJunta`);
  }


  insertOrUpdateIntegranteJunta(integrante: Integrante): Observable<IntUpdateInsertResponse> {
    const header = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': JSON.parse(localStorage.getItem('user')!).token
    })};

    return this.http.put<IntUpdateInsertResponse>(`${this.baseUrl}/insertOrUpdateIntegranteJunta`, integrante, header);
  }


  deleteIntegranteJunta(id: number): Observable<IntDeleteResponse> {
    const header = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': JSON.parse(localStorage.getItem('user')!).token
    })};

    return this.http.delete<IntDeleteResponse>(`${this.baseUrl}/deleteIntegranteJunta/${id}`, header);
  }
}
