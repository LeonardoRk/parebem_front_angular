import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleNotAuthComponent } from './module-not-auth.component';

describe('ModuleNotAuthComponent', () => {
  let component: ModuleNotAuthComponent;
  let fixture: ComponentFixture<ModuleNotAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleNotAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleNotAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
