import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdwordsComponent } from './adwords.component';

describe('AdwordsComponent', () => {
  let component: AdwordsComponent;
  let fixture: ComponentFixture<AdwordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdwordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdwordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
