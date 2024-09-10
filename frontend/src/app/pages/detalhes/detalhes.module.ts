import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpserviceModule } from "../../modules/httpservice.module";
import { DetalhesComponent } from "./detalhes.component";
import { SharedModule } from "../../shared/shared.module";

const route = [{component: DetalhesComponent, path: ''}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatInputModule,
    MatButtonModule,
    SharedModule,
    HttpserviceModule
  ],
  declarations: [DetalhesComponent]
})
export class DetalhesModule {}
