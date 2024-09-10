import { ProdutosService } from '../../../core/services/produtos/produtos.service';
import { FormFiltrosService } from './../../../core/services/form-filtros/form-filtros.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtros-complementares',
  templateUrl: './filtros-complementares.component.html',
  styleUrl: './filtros-complementares.component.scss'
})
export class FiltrosComplementaresComponent {

  @Output() realizarBusca = new EventEmitter();

  constructor(
    public formFiltrosService: FormFiltrosService,
    private produtosService: ProdutosService
  ) { }

  busca() {
    this.realizarBusca.emit(this.formFiltrosService.obterDadosFiltragem())
  }

  limparFiltros() {
    this.formFiltrosService.formFiltro.patchValue({
      precoMax: this.produtosService.precoMax,
      precoMin: this.produtosService.precoMin,
      quantidadeTotal: null
    })
  }
}
