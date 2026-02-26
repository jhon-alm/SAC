import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Adicione esta linha
import { Reclamacao } from '../../interfaces/interfacesac';
import { ReclamacaoService } from '../../services/servicesac';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, RouterOutlet], // Adicione RouterOutlet aqui
  templateUrl: './componentsac.html',
  styleUrl: './componentsac.scss'
})
export class FormularioComponent {
  // Inicializa o objeto com os campos que você definiu no model
  reclamacao: Reclamacao = {
  titulo: '',
  descricao: '',
  nome_cliente: '',
  email_contato: '',    // Deve ser igual ao Serializer
  telefone_contato: '', // Deve ser igual ao Serializer
  id_cliente: '1',      // Certifique-se de que este ID existe no Django Admin
  id_categoria: '1',    // Certifique-se de que este ID existe no Django Admin
  status: 'aberto'      // Usando o valor minúsculo definido no seu models.py
};

  constructor(private service: ReclamacaoService) {}

  salvar() {
    this.service.enviarReclamacao(this.reclamacao).subscribe({
      next: (res) => {
        alert('Reclamação enviada com sucesso!');
        console.log('Resposta do servidor:', res);
      },
      error: (err) => {
        console.error('Erro ao enviar:', err);
        alert('Erro ao enviar. Verifique o console.');
      }
    });
  }
}
