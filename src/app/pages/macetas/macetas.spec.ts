import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MacetasComponent } from './macetas';

describe('MacetasComponent', () => {
  let component: MacetasComponent;
  let fixture: ComponentFixture<MacetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacetasComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MacetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

