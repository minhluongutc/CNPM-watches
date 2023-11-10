import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOfSaleComponent } from './bill-of-sale.component';

describe('BillOfSaleComponent', () => {
  let component: BillOfSaleComponent;
  let fixture: ComponentFixture<BillOfSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillOfSaleComponent]
    });
    fixture = TestBed.createComponent(BillOfSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
