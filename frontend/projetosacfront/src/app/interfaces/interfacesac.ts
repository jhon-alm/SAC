export interface Reclamacao {
  id_reclamacao?: number | string;
  titulo: string;
  descricao: string;
  nome_cliente: string;  // Novo campo
  email_contato: string;         // Novo campo
  telefone_contato: string;      // Novo campo
  id_cliente: number | string;
  id_categoria: number | string;
  status?: string;
  data_abertura?: string;
  id_atendente?: number | string | null;
}