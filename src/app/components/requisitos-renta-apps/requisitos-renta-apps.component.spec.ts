import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitosRentaAppsComponent } from './requisitos-renta-apps.component';

describe('RequisitosRentaAppsComponent', () => {
  let component: RequisitosRentaAppsComponent;
  let fixture: ComponentFixture<RequisitosRentaAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitosRentaAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitosRentaAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
