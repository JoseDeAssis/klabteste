import { Component, Inject, Input, OnInit } from '@angular/core';
import { Produtos } from '../../../core/type/type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  vendaForm: FormGroup;
  produto: Produtos;

  constructor(
    private fb: FormBuilder,
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
  }

  onSubmit(): void {
    if (this.vendaForm.valid) {
      this.dialogRef.close(this.vendaForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
