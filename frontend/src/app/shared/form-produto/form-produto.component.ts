import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Produtos } from '../../core/type/type';
import { FormularioService } from '../../core/services/formulario/formulario.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrl: './form-produto.component.scss'
})
export class FormProdutoComponent implements OnInit {
  @Input() detalhesComponent: boolean;
  @Input() cadastrarProdutoComponent: boolean;
  @Input() editarProdutoComponent: boolean;
  @Input() produto: Produtos;
  @Output() acaoRealizada = new EventEmitter();

  form: FormGroup | null = null;
  textoBotao = 'Cadastrar Produto';
  textoH1 = "Cadastrar Novo Produto";

  constructor(
    private formularioService: FormularioService,
    private formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    const precoCurrency = this.currencyPipe.transform(this.produto.preco, 'BRL', 'symbol', '1.2-2');

    this.form = this.formBuilder.group({
      nome: [this.produto.nomeProduto, Validators.required],
      quantidadeTotal: [this.produto.quantidadeTotal, Validators.required],
      quantidadeDefeitos: [this.produto.quantidadeDefeitos, Validators.required],
      preco: [precoCurrency, Validators.required]
    });

    if(this.editarProdutoComponent) {
      this.form.get('preco').addValidators(this.validarPrecoProduto());
      this.form.get('nome').disable();
      this.form.get('quantidadeTotal').disable();
      this.textoBotao = 'Salvar Alterações';
      this.textoH1 = 'Alterar Produto';
    }
    if(this.detalhesComponent) {
      this.form.get('nome').disable();
      this.form.get('quantidadeTotal').disable();
      this.form.get('quantidadeDefeitos').disable();
      this.form.get('preco').disable();
    }

    this.formularioService.setForm(this.form);
  }

  validarPrecoProduto(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const precoNovo = parseFloat(this.form.get('preco').value.replace(/[R$,]/g, '').replace(',', '.'));
      const precoAtual = this.produto.preco;
      const isPriceValid = precoNovo < precoAtual;

      return isPriceValid ? { invalidPrice: { value: control.value }} : null;
    }
  }

  realizarAcao() {
    this.acaoRealizada.emit()
  }
}
