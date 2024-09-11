import { NgModule } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpserviceModule } from "../../modules/httpservice.module";
import { SharedModule } from "../../shared/shared.module";
import { RelatorioVendasComponent } from "./relatorio-vendas.component";

const route = [{component: RelatorioVendasComponent, path: ''}]
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
  declarations: [
    RelatorioVendasComponent
  ],
  providers: [CurrencyPipe]
})
export class RelatorioVendasModule {}
