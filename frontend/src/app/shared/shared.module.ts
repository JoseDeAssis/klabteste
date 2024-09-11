import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';
import { CardComponent } from './card/card.component';
import { FormProdutoComponent } from './form-produto/form-produto.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ContainerComponent, CardComponent, FormProdutoComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule],
  exports: [HeaderComponent, FooterComponent, ContainerComponent, CardComponent, FormProdutoComponent],
  providers: [CurrencyPipe]
})
export class SharedModule {}
