import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEnvioComponent } from './detalle-envio';

describe('DetalleEnvio', () => {
  let component: DetalleEnvioComponent;
  let fixture: ComponentFixture<DetalleEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEnvioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
