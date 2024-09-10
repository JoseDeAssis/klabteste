import {AfterViewInit, Component, inject, OnInit, ViewChild} from "@angular/core";
import { DadosFiltragem, Produtos } from "../../core/type/type";
import { HttpClient } from "@angular/common/http";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { ProdutosService } from "../../core/services/produtos/produtos.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "produtos.component.html",
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  listaProdutos: MatTableDataSource<Produtos>;
  maxPreco: number = 0;
  maxQuantidade: number = 0;
  displayedColumns: string[] = [
    'nomeProduto',
    'quantidadeTotal',
    'quantidadeDefeitos',
    'quantidadeDisponivelVenda',
    'preco',
    'acoes'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  httpClient = inject(HttpClient);

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.produtosService.listar().subscribe(
      data => {
        this.listaProdutos = new MatTableDataSource<Produtos>(data)
        this.listaProdutos.paginator = this.paginator
        this.listaProdutos.sort = this.sort
      }
    );
  }

  filtrar(event: any) {
    const valorFiltro = event.target.value.trim().toLowerCase();

    this.listaProdutos.filter = valorFiltro;

    this.listaProdutos.filterPredicate = (data: Produtos, filter: string) => {
      return data.nomeProduto.toLowerCase().includes(filter);
    };

    if (this.listaProdutos.paginator) {
      this.listaProdutos.paginator.firstPage();
    }
  }

  busca(event: DadosFiltragem) {
    const quantidadeIntervalo = (quantidadeTotal: number) => {
      switch (quantidadeTotal) {
        case 1: return 10;
        case 2: return 25;
        case 3: return 50;
        case 4: return 100;
        case 5: return 250;
        case 6: return 500;
        case 7: return 1000;
        default: return 0;
      }
    };

    this.listaProdutos.filterPredicate = (data: Produtos, filter: string) => {
      const matchesPreco = (!event.precoMin || data.preco >= event.precoMin) && (!event.precoMax || data.preco <= event.precoMax);
      const matchesQuantidade = !quantidadeIntervalo(event.quantidadeTotal) ||
        data.quantidadeTotal >= quantidadeIntervalo(event.quantidadeTotal);

      return matchesPreco && matchesQuantidade;
    };

    this.listaProdutos.filter = 'filter';
  }

  detalhar(id: number) {
    this.router.navigate([`produtos/${id}`]);
  }

}
