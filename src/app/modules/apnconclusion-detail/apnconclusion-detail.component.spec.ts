import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APNConclusionDetailComponent } from './apnconclusion-detail.component';

describe('APNConclusionDetailComponent', () => {
  let component: APNConclusionDetailComponent;
  let fixture: ComponentFixture<APNConclusionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ APNConclusionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(APNConclusionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
