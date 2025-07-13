import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuidadoComponent } from './cuidado';

describe('CuidadoComponent', () => {
  let component: CuidadoComponent;
  let fixture: ComponentFixture<CuidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuidadoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CuidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

