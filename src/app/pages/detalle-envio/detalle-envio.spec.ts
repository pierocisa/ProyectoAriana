import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEnvio } from './detalle-envio';

describe('DetalleEnvio', () => {
  let component: DetalleEnvio;
  let fixture: ComponentFixture<DetalleEnvio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEnvio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleEnvio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
