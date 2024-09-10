import { Produtos } from './../../core/type/type';
import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../core/services/produtos/produtos.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent implements OnInit {

  produto: Produtos;
  form: FormGroup | null = null

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const produtoId = Number(this.route.snapshot.paramMap.get('id'));
    this.produtosService.detalharProduto(produtoId)
      .subscribe(
        data => {
          this.produto = data;
          this.carregarCampos();
        }
      )
  }

  carregarCampos() {
    this.form.patchValue({
      nome: this.produto.nomeProduto,
      quantidadeTotal: this.produto.quantidadeTotal,
      quantidadeDefeitos: this.produto.quantidadeDefeitos,
      quantidadeDisponivelVendas: this.produto.quantidadeDisponivelVenda
    })
  }

  voltar() {
    console.log("voltar")
  }
}
