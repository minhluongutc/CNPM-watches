import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportInvoiceComponent } from './import-invoice.component';

describe('ImportInvoiceComponent', () => {
  let component: ImportInvoiceComponent;
  let fixture: ComponentFixture<ImportInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportInvoiceComponent]
    });
    fixture = TestBed.createComponent(ImportInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
