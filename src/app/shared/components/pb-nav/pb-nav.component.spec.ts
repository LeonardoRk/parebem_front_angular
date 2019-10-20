import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbNavComponent } from './pb-nav.component';

describe('PbNavComponent', () => {
  let component: PbNavComponent;
  let fixture: ComponentFixture<PbNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
