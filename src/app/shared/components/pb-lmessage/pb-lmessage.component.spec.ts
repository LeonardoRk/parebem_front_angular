import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbLmessageComponent } from './pb-lmessage.component';

describe('PbLmessageComponent', () => {
  let component: PbLmessageComponent;
  let fixture: ComponentFixture<PbLmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbLmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbLmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
