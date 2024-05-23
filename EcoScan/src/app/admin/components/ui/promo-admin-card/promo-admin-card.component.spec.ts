import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoAdminCardComponent } from './promo-admin-card.component';

describe('PromoAdminCardComponent', () => {
  let component: PromoAdminCardComponent;
  let fixture: ComponentFixture<PromoAdminCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromoAdminCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromoAdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
