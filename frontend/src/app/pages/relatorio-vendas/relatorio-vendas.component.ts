import { Component, OnInit, ViewChild } from '@angular/core';
import { VendasService } from '../../core/services/vendas/vendas.service';
import { Produtos, Vendas } from '../../core/type/type';
import { CurrencyPipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-relatorio-vendas',
  templateUrl: './relatorio-vendas.component.html',
  styleUrl: './relatorio-vendas.component.scss'
})
export class RelatorioVendasComponent implements OnInit {

  listaVendas: MatTableDataSource<Vendas>;
  displayedColumns: string[] = [];
  colunasVendas = [
    { columnDef: 'nomeComprador', header: 'Nome do Comprador', cell: (element: Vendas) => `${element.nomeComprador}` },
    { columnDef: 'nomeProduto', header: 'Nome do Produto', cell: (element: Vendas) => `${element.nomeProduto}` },
    { columnDef: 'quantidadeComprada', header: 'Quantidade Comprada', cell: (element: Vendas) => `${element.quantidadeComprada}` },
    { columnDef: 'valorTotal', header: 'Valor Total', cell: (element: Vendas) => this.currencyPipe.transform(element.valorTotal, 'BRL', 'symbol', '1.2-2') },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vendasService: VendasService,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
    this.vendasService.listar().subscribe(data => {
      this.displayedColumns = this.colunasVendas.map(c => c.columnDef);
      this.listaVendas = new MatTableDataSource<Vendas>(data);
      this.listaVendas.paginator = this.paginator;
      this.listaVendas.sort = this.sort;
    });
  }

}
