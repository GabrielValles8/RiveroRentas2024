import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasladosChoferComponent } from './traslados-chofer.component';

describe('TrasladosChoferComponent', () => {
  let component: TrasladosChoferComponent;
  let fixture: ComponentFixture<TrasladosChoferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasladosChoferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrasladosChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
