import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Reclamacao } from '../interfaces/interfacesac';

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ReclamacaoService {
  private apiUrl = 'http://127.0.0.1:8000/reclamacoes/';
  private clientesUrl = 'http://127.0.0.1:8000/clientes/';
  private categoriasUrl = 'http://127.0.0.1:8000/categorias/';

  constructor(private http: HttpClient) { }

  enviarReclamacao(reclamacao: Reclamacao): Observable<Reclamacao> {
    return this.http.post<Reclamacao>(this.apiUrl, reclamacao);
  }

  getReclamacoes(): Observable<Reclamacao[]> {
    console.log('Buscando reclamações na URL:', this.apiUrl);
    return this.http.get<PaginatedResponse<Reclamacao>>(this.apiUrl).pipe(
      map((response) => {
        console.log('Resposta bruta do servidor:', response);
        console.log('Tem results?', 'results' in response);
        console.log('Results:', response.results);
        
        // A resposta sempre vem paginada, então extraímos o array results
        if (response && response.results && Array.isArray(response.results)) {
          console.log('Retornando array com', response.results.length, 'reclamações');
          return response.results;
        }
        
        console.warn('Formato de resposta inesperado:', response);
        return [];
      }),
      catchError((error) => {
        console.error('Erro ao buscar reclamações no serviço:', error);
        console.error('Status:', error.status);
        console.error('Status Text:', error.statusText);
        console.error('URL:', error.url);
        return throwError(() => error);
      })
    );
  }

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.clientesUrl);
  }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriasUrl);
  }
}