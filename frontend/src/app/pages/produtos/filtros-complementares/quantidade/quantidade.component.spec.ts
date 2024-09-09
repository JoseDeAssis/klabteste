import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantidadeComponent } from './quantidade.component';

describe('QuantidadeComponent', () => {
  let component: QuantidadeComponent;
  let fixture: ComponentFixture<QuantidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
