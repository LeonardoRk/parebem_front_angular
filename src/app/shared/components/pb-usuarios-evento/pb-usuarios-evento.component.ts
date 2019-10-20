import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pb-usuarios-evento',
  templateUrl: './pb-usuarios-evento.component.html',
  styleUrls: ['./pb-usuarios-evento.component.css']
})
export class PbUsuariosEventoComponent implements OnInit {
  @Input() usuariosEvento:any;
  constructor() { }

  ngOnInit() {
    console.log(this.usuariosEvento);
    this.usuariosEvento = JSON.parse(this.usuariosEvento);
  }

}
