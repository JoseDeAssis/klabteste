import { Produtos } from './../../core/type/type';
import { Component } from '@angular/core';
import { ProdutosService } from '../../core/services/produtos/produtos.service';
import { FormularioService } from '../../core/services/formulario/formulario.service';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrl: './cadastrar-produto.component.scss'
})
export class CadastrarProdutoComponent {

  cadastrarProdutoComponent = true;
  produto: Produtos = null;

  constructor(
    private produtosService: ProdutosService,
    private formularioService: FormularioService
  ) { }

  cadastrarProduto() {
    console.log(this.formularioService.getForm())
  }
}
