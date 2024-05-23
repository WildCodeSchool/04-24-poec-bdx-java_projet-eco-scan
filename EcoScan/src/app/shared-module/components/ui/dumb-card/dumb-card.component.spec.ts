import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbCardComponent } from './dumb-card.component';

describe('DumbCardComponent', () => {
  let component: DumbCardComponent;
  let fixture: ComponentFixture<DumbCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DumbCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DumbCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
