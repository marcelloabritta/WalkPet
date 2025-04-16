export class Passeador {
  constructor(
    id,
    nome,
    cpf,
    username,
    email,
    senha,
    descricao,
    curiosidades,
    cidade,
    estado,
    distancia,
    preco,
    foto,
    avaliacoes = []
  ) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.username = username;
    this.email = email;
    this.senha = senha;
    this.descricao = descricao;
    this.curiosidades = curiosidades;
    this.cidade = cidade;
    this.estado = estado;
    this.distancia = distancia;
    this.preco = preco;
    this.foto = foto;
    this.avaliacoes = Array.isArray(avaliacoes) ? avaliacoes : [];
  }

  adicionarAvaliacao(avaliacao) {
    this.avaliacoes.push(avaliacao);
  }

  atualizarFoto(novaFoto) {
    this.foto = novaFoto;
  }
}
