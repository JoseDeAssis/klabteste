import { FormFiltrosService } from './../../../../core/services/form-filtros/form-filtros.service';
import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../../../core/services/produtos/produtos.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-precos',
  templateUrl: './precos.component.html',
  styleUrl: './precos.component.scss'
})
export class PrecosComponent implements OnInit {
  precoMinDisplayed?: number;
  precoMaxDisplayed?: number;
  precoMinForm: FormControl<number>;
  precoMaxForm: FormControl<number>;

  constructor(
    public produtosService: ProdutosService,
    private formFiltrosService: FormFiltrosService
  ) {
    this.precoMaxForm = formFiltrosService.obterControle<number>('precoMax');
    this.precoMinForm = formFiltrosService.obterControle<number>('precoMin');
  }

  ngOnInit(): void {
    this.produtosService.calcularMaiorPreco()
      .subscribe(() => {
        this.formFiltrosService.formFiltro.patchValue({
          precoMax: this.produtosService.precoMax,
          precoMin: this.produtosService.precoMin,
          quantidadeTotal: null
        })
        this.precoMaxDisplayed = this.produtosService.precoMax
        this.precoMinDisplayed = 0
      })
  }

  atualizaMax(event: any) {
    this.precoMaxDisplayed = event.target.value;
    this.precoMaxForm = this.formFiltrosService.obterControle<number>('precoMax');
  }

  atualizaMin(event: any) {
    this.precoMinDisplayed = event.target.value;
    this.precoMaxForm = this.formFiltrosService.obterControle<number>('precoMax');
  }

}
