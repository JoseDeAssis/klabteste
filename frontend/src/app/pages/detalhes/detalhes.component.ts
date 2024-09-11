import { Produtos } from './../../core/type/type';
import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../core/services/produtos/produtos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent implements OnInit {

  produto: Produtos;
  detalhesComponent = true;

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private openDialog: MatDialog
  ) { }

  ngOnInit(): void {
    const produtoId = Number(this.route.snapshot.paramMap.get('id'));

    this.produtosService.detalharProduto(produtoId)
    .subscribe(data => this.produto = data)
  }

  cadastrarVenda() {
    this.openDialog.open(ModalComponent, {
      data: {
        produto: this.produto
      }
    });
  }
}
