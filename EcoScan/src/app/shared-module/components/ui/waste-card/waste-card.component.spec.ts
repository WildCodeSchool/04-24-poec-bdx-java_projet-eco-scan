import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteCardComponent } from './waste-card.component';

describe('WasteCardComponent', () => {
  let component: WasteCardComponent;
  let fixture: ComponentFixture<WasteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WasteCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WasteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
