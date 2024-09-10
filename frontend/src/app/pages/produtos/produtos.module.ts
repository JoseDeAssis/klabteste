import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProdutosComponent } from "./produtos.component";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpserviceModule } from "../../modules/httpservice.module";
import { LabelComponent } from "./filtros-complementares/label/label.component";
import { PrecosComponent } from "./filtros-complementares/precos/precos.component";
import { QuantidadeComponent } from "./filtros-complementares/quantidade/quantidade.component";
import { FiltrosComplementaresComponent } from "./filtros-complementares/filtros-complementares.component";
import { SharedModule } from "../../shared/shared.module";

const route = [{component: ProdutosComponent, path: ''}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpserviceModule
  ],
  declarations: [ProdutosComponent, FiltrosComplementaresComponent, LabelComponent, PrecosComponent, QuantidadeComponent]
})
export class ProdutosModule {}
