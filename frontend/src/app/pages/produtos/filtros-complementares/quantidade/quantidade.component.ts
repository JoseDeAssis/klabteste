import { OpcoesQuantidadeTotal } from './../../../../core/type/type';
import { FormFiltrosService } from './../../../../core/services/form-filtros/form-filtros.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-quantidade',
  templateUrl: './quantidade.component.html',
  styleUrl: './quantidade.component.scss'
})
export class QuantidadeComponent implements OnInit {
  opcoesSelecionadas: OpcoesQuantidadeTotal | null = null;

  opcoes: OpcoesQuantidadeTotal[] = [
    {
      display: "Acima de 10",
      value: "1"
    },
    {
      display: "Acima de 25",
      value: "2"
    },
    {
      display: "Acima de 50",
      value: "3"
    },
    {
      display: "Acima de 100",
      value: "4"
    },
    {
      display: "Acima de 250",
      value: "5"
    },
    {
      display: "Acima de 500",
      value: "6"
    },
    {
      display: "Acima de 1000",
      value: "7"
    },
  ];

  quantidadeControl: FormControl<number | null>;

  constructor(private formFiltrosService: FormFiltrosService) {
    this.quantidadeControl = formFiltrosService.obterControle<number>('quantidadeTotal');
  }

  ngOnInit(): void {
    this.quantidadeControl.valueChanges.subscribe(
      value => {
        if(value === null) {
          this.opcoesSelecionadas = null;
        }
      }
    )
  }

  alternarParada(opcao: OpcoesQuantidadeTotal, checked: boolean){
    if(!checked){
      this.opcoesSelecionadas = null;
      this.formFiltrosService.formFiltro.patchValue({
        quantidadeTotal: null
      })
      return
    }
    this.opcoesSelecionadas = opcao
    this.formFiltrosService.formFiltro.patchValue({
      quantidadeTotal: Number(opcao.value)
    })
  }

  paradaSelecionada(opcao: OpcoesQuantidadeTotal) {
    return this.opcoesSelecionadas === opcao
  }

  incluirParada(opcao: OpcoesQuantidadeTotal) {
    if(!this.opcoesSelecionadas){
      return false
    }
    return this.opcoesSelecionadas.value > opcao.value
  }
}
