import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SacSolicitacao } from '../model/sacSolicitacao';


@Injectable({
  providedIn: 'root'
})
export class SacService {
  
  constructor(private http: HttpClient ) { }

  save(sac:SacSolicitacao): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>('/api/sac-service/controle-sac/save', JSON.stringify(sac), httpOptions);
  }

}
