import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContasBancarias } from '../model/contas-bancarias';
import { Observable, of } from 'rxjs';

@Injectable()
export class ContasBancariasService {

  private saveContasUrl: string;
  private findUrl: string;

  constructor(private http: HttpClient) {
    this.findUrl = 'http://localhost:9090/listarConta';
    this.saveContasUrl = 'http://localhost:9090/criarConta';
  }

  public findAll(): Observable<ContasBancarias[]> {
    return this.http.get<ContasBancarias[]>(this.findUrl);
  }

  public save(contas: ContasBancarias) : Observable<ContasBancarias> {
    return this.http.post<ContasBancarias>(this.saveContasUrl, contas);
  }
}