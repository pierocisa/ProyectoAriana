import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SustractosComponent } from './sustractos';

describe('SustractosComponent', () => {
  let component: SustractosComponent;
  let fixture: ComponentFixture<SustractosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SustractosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SustractosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
