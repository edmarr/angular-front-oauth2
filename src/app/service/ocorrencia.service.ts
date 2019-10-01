import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListaItem } from '../model/listaItem';
import { Ocorrencia } from '../model/ocorrencia';
import { Observable } from 'rxjs';
import { CargaService } from './carga.service';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {
  
  constructor(private http: HttpClient , private serviceCarga :CargaService) { }

  public getListaitensEntrega() {
    return this.serviceCarga.getListaitensEntrega();
  }

 public getListaiTipo() {
    return this.http.get<ListaItem[]>('/api/ocorrencia-service/controle-ocorrencia/lista-tipo');
  }

  save(ocorrencia:Ocorrencia): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>('/api/ocorrencia-service/controle-ocorrencia/save', JSON.stringify(ocorrencia), httpOptions);
  }

}
