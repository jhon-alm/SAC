import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamacao } from '../interfaces/interfacesac';

@Injectable({
  providedIn: 'root'
})
export class ReclamacaoService {
  private apiUrl = 'http://127.0.0.1:8000/reclamacoes/';

  constructor(private http: HttpClient) { }

  enviarReclamacao(reclamacao: Reclamacao): Observable<Reclamacao> {
    return this.http.post<Reclamacao>(this.apiUrl, reclamacao);
  }

  getReclamacoes(): Observable<Reclamacao[]> {
    return this.http.get<Reclamacao[]>(this.apiUrl);
  }
}