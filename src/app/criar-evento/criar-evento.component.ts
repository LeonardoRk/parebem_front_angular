import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-criar-evento',
  templateUrl: './criar-evento.component.html',
  styleUrls: ['./criar-evento.component.css']
})
export class CriarEventoComponent  implements OnInit {

  private formularioEvento :FormGroup
  constructor(private formBuilder: FormBuilder, 
              private apiService:ApiService,
              private router:Router,
              private tokenService:TokenService) { 
      if(!this.tokenService.hasToken()){
        this.router.navigate(['']);
      }
  }

  ngOnInit() {
    this.formularioEvento = this.formBuilder.group({
      local:['', Validators.required],
      limite_convidados:['', Validators.required],
      momento:['', Validators.required]
    })
  }

  cadastrarEvento(){
    const local = this.formularioEvento.get('local').value;;
    const limite_convidados = this.formularioEvento.get('limite_convidados').value;;
    const momento = this.formularioEvento.get('momento').value;
    console.log(limite_convidados + "  " + local + "  " + momento);
    this.apiService.createEvento(local, limite_convidados, momento)
      .subscribe(
        data => {
          console.log("dados retornados do servidor")
          console.log(data);
          this.router.navigate(["home"]);
        },
        err => {
          console.log("erro para criar evento");
          console.log(err);
        }
      );
  }

}
