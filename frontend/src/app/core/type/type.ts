export interface Produtos {
  id: number,
  nomeProduto: string,
  quantidadeTotal: number,
  quantidadeDefeitos: number,
  quantidadeDisponivelVenda: number,
  preco: number
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
