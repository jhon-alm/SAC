import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Reclamacao } from '../../interfaces/interfacesac';
import { ReclamacaoService } from '../../services/servicesac';
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './historico.html',
  styleUrl: './historico.scss'
})
export class HistoricoComponent implements OnInit {
  reclamacoes: Reclamacao[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private service: ReclamacaoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarReclamacoes();
  }

  carregarReclamacoes() {
    this.loading = true;
    this.error = null;
    
    console.log('Iniciando carregamento de reclamações...');
    
    this.service.getReclamacoes().subscribe({
      next: (data) => {
        console.log('Dados recebidos do serviço:', data);
        console.log('Tipo:', typeof data);
        console.log('É array?', Array.isArray(data));
        console.log('Quantidade:', Array.isArray(data) ? data.length : 'não é array');
        
        this.reclamacoes = Array.isArray(data) ? data : [];
        
        console.log('Reclamações atribuídas:', this.reclamacoes.length);
        console.log('Primeira reclamação:', this.reclamacoes[0]);
        
        this.loading = false;
        this.cdr.detectChanges(); // esta forçando a detecção de mudanças
        
        if (this.reclamacoes.length === 0) {
          console.log('Nenhuma reclamação encontrada no banco de dados');
        } else {
          console.log('Reclamações carregadas com sucesso!');
        }
      },
      error: (err) => {
        console.error('Erro completo:', err);
        console.error('Status:', err.status);
        console.error('Status Text:', err.statusText);
        console.error('URL:', err.url);
        console.error('Mensagem:', err.message);
        console.error('Erro detalhado:', err.error);
        
        let errorMessage = 'Erro ao carregar histórico de reclamações.';
        if (err.status === 0) {
          errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
        } else if (err.status === 404) {
          errorMessage = 'Endpoint não encontrado. Verifique a URL da API.';
        } else if (err.error?.detail) {
          errorMessage = `Erro: ${err.error.detail}`;
        } else if (err.error?.message) {
          errorMessage = `Erro: ${err.error.message}`;
        } else if (err.message) {
          errorMessage = `Erro: ${err.message}`;
        }
        
        this.error = errorMessage;
        this.loading = false;
        this.cdr.detectChanges(); 
      }
    });
  }

  formatarData(data: string | undefined): string {
    if (!data) return 'N/A';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'aberto':
        return 'status-aberto';
      case 'em_analise':
        return 'status-analise';
      case 'concluido':
        return 'status-concluido';
      default:
        return 'status-default';
    }
  }

  getStatusLabel(status: string | undefined): string {
    switch (status) {
      case 'aberto':
        return 'Aberto';
      case 'em_analise':
        return 'Em Análise';
      case 'concluido':
        return 'Concluído';
      default:
        return status || 'N/A';
    }
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
