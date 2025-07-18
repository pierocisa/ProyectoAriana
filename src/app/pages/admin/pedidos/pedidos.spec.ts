import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosComponent } from './pedidos';


describe('Pedidos', () => {
  let component: PedidosComponent;
  let fixture: ComponentFixture<PedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
