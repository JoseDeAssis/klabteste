import { FormularioService } from './../../core/services/formulario/formulario.service';
import { Component, inject, OnInit } from '@angular/core';
import { PatchProduto, Produtos } from '../../core/type/type';
import { ProdutosService } from '../../core/services/produtos/produtos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss'
})
export class EditarComponent implements OnInit {

  produto: Produtos;
  editarProdutoComponent = true;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private router: Router,
    private formularioService: FormularioService
  ) { }

  ngOnInit(): void {
    const produtoId = Number(this.route.snapshot.paramMap.get('id'));

    this.produtosService.detalharProduto(produtoId)
    .subscribe(data => this.produto = data)
  }

  salvarAlteracoes() {
    const form = this.formularioService.getForm();
    const precoFormatado = parseFloat(form.get('preco').value.replace(/[R$,]/g, '').replace(',', '.'));
    const produtoAtualizado: PatchProduto = {
      preco: precoFormatado,
      quantidadeDefeitos: Number(this.formularioService.getForm().get('quantidadeDefeitos').value)
    }

    if(form.valid) {
      this.produtosService.atualizarProduto(this.produto.id, produtoAtualizado)
        .subscribe(
          res => {
            this._snackBar.open(res.response);
            this.router.navigate(['']);
          }
        )
      }
    }
}
