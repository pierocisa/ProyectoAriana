import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SustratosComponent } from './sustratos';

describe('SustractosComponent', () => {
  let component: SustratosComponent;
  let fixture: ComponentFixture<SustratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SustratosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SustratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
