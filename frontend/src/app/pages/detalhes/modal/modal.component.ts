import { FormularioService } from './../../../core/services/formulario/formulario.service';
import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { dadosCadastroVenda, Produtos } from '../../../core/type/type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendasService } from '../../../core/services/vendas/vendas.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  vendaForm: FormGroup;
  produtoForm: FormGroup;
  produto: Produtos;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private vendasService: VendasService,
    private formularioService: FormularioService,
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { produto: any }
  ) {
    this.produto = data.produto;
  }

  ngOnInit(): void {
    this.vendaForm = this.fb.group({
      comprador: ['', [Validators.required]],
      quantidade: [1, [Validators.required, Validators.min(1), Validators.max(this.data.produto.quantidadeDisponivelVenda)]]
    });
    this.produtoForm = this.formularioService.getForm();
  }

  onSubmit(): void {
    if (this.vendaForm.valid) {
      const cadastroVenda: dadosCadastroVenda = {
        produtoId: this.produto.id,
        quantidadeComprada: this.vendaForm.get('quantidade').value,
        nomeComprador: this.vendaForm.get('comprador').value
      };

      this.vendasService.cadastrarVenda(cadastroVenda).subscribe(
        res => {
          this._snackBar.open(res.response);
          this.router.navigate(['']);
        }
      );
      this.dialogRef.close(this.vendaForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
