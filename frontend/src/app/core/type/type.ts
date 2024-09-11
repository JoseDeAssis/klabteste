export interface Produtos {
  id: number,
  nomeProduto: string,
  quantidadeTotal: number,
  quantidadeDefeitos: number,
  quantidadeDisponivelVenda: number,
  preco: number
}

export interface dadosCadastroVenda {
  produtoId: number,
  quantidadeComprada: number,
  nomeComprador: string
}

export interface OpcoesQuantidadeTotal {
  display: string,
  value: string
}

export interface DadosFiltragem {
  precoMax: number,
  precoMin: number,
  quantidadeTotal: number
}

export interface PatchProduto {
  preco: number,
  quantidadeDefeitos: number
}
