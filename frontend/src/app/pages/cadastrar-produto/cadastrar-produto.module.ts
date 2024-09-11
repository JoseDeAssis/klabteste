import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpserviceModule } from "../../modules/httpservice.module";
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
import { CadastrarProdutoComponent } from "./cadastrar-produto.component";

const route = [{component: CadastrarProdutoComponent, path: ''}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatSnackBarModule,
    SharedModule,
    ReactiveFormsModule,
    HttpserviceModule
  ],
  declarations: [CadastrarProdutoComponent]
})
export class CadastrarProdutoModule {}
