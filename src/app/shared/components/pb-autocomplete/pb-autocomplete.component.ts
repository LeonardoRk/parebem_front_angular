import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'pb-autocomplete',
  templateUrl: './pb-autocomplete.component.html',
  styleUrls: ['./pb-autocomplete.component.css']
})
export class PbAutocompleteComponent implements OnInit {
  @Input() id;
  @Input() nRelacionados;
  @Input() desabilitado = false;
  @Input() textoPlaceholder = "Escolha um usuário";
  @Output() metodoPai = new EventEmitter();
  myForm:FormGroup;
  myControl:FormControl;
  options = [];
  filteredOptions: Observable<string[]>;

  constructor(private apiService:ApiService, private router:Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
    });
    this.myControl = new FormControl({value:'', disabled: this.desabilitado}, [Validators.required]);
    
    for (let key in this.nRelacionados) {
      if (this.nRelacionados.hasOwnProperty(key)) {           
          this.options.push(this.nRelacionados[key]);
      }
    }

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  cadastrarUsuarioEvento(){
    console.log("botao clickado");
    const id_evento = this.id;
    console.log("id_evento: " + id_evento);
    const nome_usuario = this.myControl.value;
    const id_usuario = this.descobreIdUsuario(nome_usuario);
    if(id_usuario != -1){
      console.log("cadastrar usuario no evento");
      console.log("id usuário: " + id_usuario);
      console.log("emitindo valores para pai");
      let obj = {"id_usuario":id_usuario.toString(), "id_evento":id_evento.toString()};
      console.log('objeto selecionado');
      this.metodoPai.emit(JSON.stringify(obj));
    }else{
      alert("Nome de usuário não cadastrado");
    }
  }

  descobreIdUsuario(nome:string){
    let id_usuario = -1;
    for(let key in this.nRelacionados){
      if(this.nRelacionados[key] == nome){
        id_usuario = Number(key);
      }
    }
    return id_usuario;
  }

}
