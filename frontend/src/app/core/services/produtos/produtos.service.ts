import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Produtos } from '../../type/type';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private listaProdutos$?: Observable<Produtos[]>;
  precoMax: number;
  precoMin: number;

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Produtos[]> {
    if(!this.listaProdutos$) {
      this.listaProdutos$ = this.requestProdutos().pipe(shareReplay(1));
    }

    return this.listaProdutos$;
  }

  procurarNome(nome: string): Observable<Produtos[]> {
    if(!this.listaProdutos$) return null;

    const listaProdutosFiltrada = this.listaProdutos$.pipe(
      map((produtos: Produtos[]) => {
        return produtos.filter(produto => produto.nomeProduto.toLowerCase().includes(nome.toLowerCase()))
      }));

    return listaProdutosFiltrada;
  }

  calcularMaiorPreco(): Observable<number> {
    if (!this.listaProdutos$) return null;

    return this.listaProdutos$.pipe(
      map((produtos: Produtos[]) => {
        this.precoMax = produtos.reduce((max, produto) => produto.preco > max ? produto.preco : max, 0);
        this.precoMin = 0
        return this.precoMax;
      })
    );
  }

  calcularMaiorQuantidadeTotal(): Observable<number> {
    if (!this.listaProdutos$) return null;

    return this.listaProdutos$.pipe(
      map((produtos: Produtos[]) =>
        produtos.reduce((max, produto) => produto.quantidadeTotal > max ? produto.quantidadeTotal : max, 0)
      )
    );
  }

  private requestProdutos(): Observable<Produtos[]> {
    return this.httpClient.get<Produtos[]>('produtos');
  }
}
