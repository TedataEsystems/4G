import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMVPNRequestComponent } from './dmvpnrequest.component';

describe('DMVPNRequestComponent', () => {
  let component: DMVPNRequestComponent;
  let fixture: ComponentFixture<DMVPNRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMVPNRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMVPNRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
