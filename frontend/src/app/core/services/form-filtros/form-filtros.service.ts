import { DadosFiltragem } from './../../type/type';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProdutosService } from '../produtos/produtos.service';

@Injectable({
  providedIn: 'root'
})
export class FormFiltrosService {

  formFiltro: FormGroup;

  constructor(private produtosService: ProdutosService) {
    this.formFiltro = new FormGroup({
      precoMax: new FormControl(null),
      precoMin: new FormControl(null),
      quantidadeTotal: new FormControl(null)
    })
  }

  obterControle<T>(nome: string): FormControl {
    const control = this.formFiltro.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl<T>;
  }

  obterDadosFiltragem(): DadosFiltragem {
    const dadosFiltragem: DadosFiltragem = {
      precoMax: this.produtosService.precoMax,
      precoMin: this.produtosService.precoMin,
      quantidadeTotal: null
    };

    const precoMax = this.obterControle<number>('precoMax');
    if(precoMax.value) {
      dadosFiltragem.precoMax = precoMax.value;
    }

    const precoMin = this.obterControle<number>('precoMin');
    if(precoMin.value) {
      dadosFiltragem.precoMin = precoMin.value;
    }

    const quantidadeTotal = this.obterControle<number>('quantidadeTotal');
    if(quantidadeTotal.value) {
      dadosFiltragem.quantidadeTotal = quantidadeTotal.value;
    }

    return dadosFiltragem;
  }
}
