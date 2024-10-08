import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVendasComponent } from './relatorio-vendas.component';

describe('RelatorioVendasComponent', () => {
  let component: RelatorioVendasComponent;
  let fixture: ComponentFixture<RelatorioVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioVendasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatorioVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
