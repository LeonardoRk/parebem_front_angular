import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbUsuariosEventoComponent } from './pb-usuarios-evento.component';

describe('PbUsuariosEventoComponent', () => {
  let component: PbUsuariosEventoComponent;
  let fixture: ComponentFixture<PbUsuariosEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbUsuariosEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbUsuariosEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
