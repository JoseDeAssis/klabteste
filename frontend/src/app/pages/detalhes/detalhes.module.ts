import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { HttpserviceModule } from "../../modules/httpservice.module";
import { ReactiveFormsModule } from '@angular/forms';
import { DetalhesComponent } from "./detalhes.component";
import { SharedModule } from "../../shared/shared.module";
import { ModalComponent } from "./modal/modal.component";

const route = [{component: DetalhesComponent, path: ''}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    SharedModule,
    ReactiveFormsModule,
    HttpserviceModule
  ],
  declarations: [DetalhesComponent, ModalComponent]
})
export class DetalhesModule {}
