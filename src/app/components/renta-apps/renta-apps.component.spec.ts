import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentaAppsComponent } from './renta-apps.component';

describe('RentaAppsComponent', () => {
  let component: RentaAppsComponent;
  let fixture: ComponentFixture<RentaAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentaAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentaAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
