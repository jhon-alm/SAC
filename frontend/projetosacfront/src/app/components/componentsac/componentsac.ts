import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Reclamacao } from '../../interfaces/interfacesac';
import { ReclamacaoService } from '../../services/servicesac';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, RouterOutlet, CommonModule, Header, Footer],
  templateUrl: './componentsac.html',
  styleUrl: './componentsac.scss'
})
export class FormularioComponent implements OnInit {
  // Inicializa o objeto com os campos que você definiu no model
  reclamacao: Reclamacao = {
  titulo: '',
  descricao: '',
  nome_cliente: '',
  email_contato: '',    // Deve ser igual ao Serializer
  telefone_contato: '', // Deve ser igual ao Serializer
  id_cliente: '1',      // ID do cliente padrão (numérico)
  id_categoria: '1',    // ID da categoria padrão (numérico)
  status: 'aberto'      // Usando o valor minúsculo definido no seu models.py
};

  // Estatísticas do backend
  stats = {
    totalReclamacoes: 0,
    emAberto: 0,
    emAnalise: 0,
    concluidas: 0
  };

  // Flag para controlar se os dados foram carregados
  dadosCarregados = false;

  loading = false;
  showSuccessModal = false;

  constructor(
    private service: ReclamacaoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarEstatisticas();
  }

  carregarEstatisticas() {
    this.loading = true;
    this.dadosCarregados = false;
    console.log('Carregando estatísticas...');
    this.service.getReclamacoes().subscribe({
      next: (reclamacoes) => {
        console.log('Reclamações recebidas:', reclamacoes);
        const lista = Array.isArray(reclamacoes) ? reclamacoes : [];
        console.log('Lista processada:', lista);
        console.log('Total de reclamações:', lista.length);
        
        // Calcula as estatísticas
        this.stats.totalReclamacoes = lista.length;
        
        // Normaliza o status para comparação (converte para minúsculas e remove espaços/underscores)
        const normalizarStatus = (status: string | undefined): string => {
          if (!status) return '';
          return status.toLowerCase().replace(/\s+/g, '_').replace(/[áàâã]/g, 'a').replace(/[éê]/g, 'e').replace(/[íî]/g, 'i').replace(/[óôõ]/g, 'o').replace(/[úû]/g, 'u').replace(/ç/g, 'c');
        };
        
        this.stats.emAberto = lista.filter(r => {
          const statusNormalizado = normalizarStatus(r.status);
          return statusNormalizado === 'aberto';
        }).length;
        
        this.stats.emAnalise = lista.filter(r => {
          const statusNormalizado = normalizarStatus(r.status);
          return statusNormalizado === 'em_analise' || statusNormalizado === 'emanalise';
        }).length;
        
        this.stats.concluidas = lista.filter(r => {
          const statusNormalizado = normalizarStatus(r.status);
          return statusNormalizado === 'concluido' || statusNormalizado === 'concluída';
        }).length;
        
        console.log('Estatísticas calculadas:', this.stats);
        console.log('Total de Reclamações:', this.stats.totalReclamacoes);
        console.log('Em Aberto:', this.stats.emAberto);
        console.log('Em Análise:', this.stats.emAnalise);
        console.log('Concluídas:', this.stats.concluidas);
        
        // Força a atualização da view
        this.dadosCarregados = true;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar estatísticas:', err);
        console.error('Detalhes do erro:', err.error);
        this.stats = {
          totalReclamacoes: 0,
          emAberto: 0,
          emAnalise: 0,
          concluidas: 0
        };
        this.dadosCarregados = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  salvar() {
    this.service.enviarReclamacao(this.reclamacao).subscribe({
      next: (res) => {
        console.log('Resposta do servidor:', res);
        this.carregarEstatisticas();
        this.reclamacao = {
          titulo: '',
          descricao: '',
          nome_cliente: '',
          email_contato: '',
          telefone_contato: '',
          id_cliente: '1',
          id_categoria: '1',
          status: 'aberto'
        };
        // Mostra o modal de sucesso
        this.showSuccessModal = true;
      },
      error: (err) => {
        console.error('Erro ao enviar:', err);
        if (err.error) {
          console.error('Detalhes do erro:', err.error);
          alert('Erro ao enviar: ' + JSON.stringify(err.error));
        } else {
          alert('Erro ao enviar. Verifique o console.');
        }
      },
      complete() {
        console.log('Requisição concluída');
      },
    });
  }

  navegarPara(rota: string) {
    if (rota === 'historico') {
      this.router.navigate(['/historico']);
    } else if (rota === 'reclamacoes') {
      this.router.navigate(['/']);
    }
  }

  fecharModal() {
    this.showSuccessModal = false;
  }
}
