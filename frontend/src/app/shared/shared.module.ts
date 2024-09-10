import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ContainerComponent, CardComponent],
  imports: [CommonModule, MatToolbarModule],
  exports: [HeaderComponent, FooterComponent, ContainerComponent, CardComponent],
})
export class SharedModule {}
