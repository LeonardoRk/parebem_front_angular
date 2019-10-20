import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pb-lmessage',
  templateUrl: './pb-lmessage.component.html',
  styleUrls: ['./pb-lmessage.component.css']
})
export class PbLmessageComponent implements OnInit {

  @Input() texto:string = "";
  constructor() { }

  ngOnInit() {
    console.log("iniciando módulo pblmessage component");
    console.log(this.texto);
  }

}
