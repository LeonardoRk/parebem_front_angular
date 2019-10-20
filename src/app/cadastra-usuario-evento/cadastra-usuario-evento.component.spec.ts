import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraUsuarioEventoComponent } from './cadastra-usuario-evento.component';

describe('CadastraUsuarioEventoComponent', () => {
  let component: CadastraUsuarioEventoComponent;
  let fixture: ComponentFixture<CadastraUsuarioEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastraUsuarioEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastraUsuarioEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
