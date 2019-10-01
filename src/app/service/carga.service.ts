import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListaItem } from '../model/listaItem';
import { Ocorrencia } from '../model/ocorrencia';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CargaService {
  
  constructor(private http: HttpClient) { }

  public getListaitensEntrega() {
    return this.http.get<ListaItem[]>('api/carga-service/controle-carga/listarItemBemProduto');
  }

  

} 
