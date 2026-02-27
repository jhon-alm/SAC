from django.db import models

class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    telefone = models.CharField(max_length=20)

    def __str__(self):
        return self.nome

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=50)
    descricao = models.CharField(max_length=200)

    def __str__(self):
        return self.nome

class Atendente(models.Model):
    id_atendente = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    setor = models.CharField(max_length=50)

    def __str__(self):
        return self.nome

class Reclamacao(models.Model):
    STATUS_CHOICES = [
        ('aberto', 'Aberto'),
        ('em_analise', 'Em Análise'),
        ('concluido', 'Concluído'),
    ]

    id_reclamacao = models.AutoField(primary_key=True)
    
    # NOVOS CAMPOS ADICIONADOS PARA O FORMULÁRIO ANGULAR
    nome_cliente = models.CharField(max_length=150, verbose_name="Nome no formulário")
    email_contato = models.EmailField(max_length=100, verbose_name="E-mail de contato")
    telefone_contato = models.CharField(max_length=20, verbose_name="Telefone de contato")
    
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    data_abertura = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='aberto')
    
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='reclamacoes')
    id_categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT, related_name='reclamacoes')
    id_atendente = models.ForeignKey(Atendente, on_delete=models.SET_NULL, null=True, blank=True, related_name='reclamacoes')

    def __str__(self):
        return f"{self.titulo} ({self.status})"

    class Meta:
        verbose_name = "Reclamação"
        verbose_name_plural = "Reclamações"