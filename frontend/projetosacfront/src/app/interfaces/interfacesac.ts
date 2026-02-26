export interface Reclamacao {
  id_reclamacao?: string;
  titulo: string;
  descricao: string;
  nome_cliente: string;  // Novo campo
  email_contato: string;         // Novo campo
  telefone_contato: string;      // Novo campo
  id_cliente: string;
  id_categoria: string;
  status?: string;
}