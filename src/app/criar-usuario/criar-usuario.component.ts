import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent implements OnInit {

  cadastraUsuario: FormGroup;
  ondeRedirecionar:string;
  private nomeValido = true;
  private informacao:string = "Nome já existente, tente outro";

  constructor(private formBuilder: FormBuilder, private apiService:ApiService, 
            private router:Router, private tokenService:TokenService) {  
  }

  ngOnInit() {
    this.ondeRedirecionar = history.state.route;
    console.log(this.ondeRedirecionar);
    if(this.ondeRedirecionar != undefined){
      // criando primeiro usuário
    }else if(!this.tokenService.hasToken()){
      this.router.navigate(['']);
    }
    this.cadastraUsuario = this.formBuilder.group({
      nome:['', Validators.required],
      senha:['', Validators.required],
      telefone:['', Validators.required]
    });
  }

  onSubmit(){
    console.log("formulário submetido");
    const nome = this.cadastraUsuario.get('nome').value;
    const senha = this.cadastraUsuario.get('senha').value;
    const telefone = this.cadastraUsuario.get('telefone').value;
    this.apiService.createUser(nome, senha, telefone)
      .subscribe(
        data => {
          console.log("retorno do servidor para cadastro de usuário");
          let dataString = JSON.stringify(data);
          console.log(dataString);
          let json = JSON.parse(dataString)[0];
          console.log("json formatado");
          console.log(json);
          if(json != undefined && "erro" in json){
            console.log("erro de constraint detectado");
            this.nomeValido = false;
            this.cadastraUsuario.controls["nome"].setValue("");
          }else{
            this.nomeValido = true;
            if(this.ondeRedirecionar != undefined){
              this.router.navigate([this.ondeRedirecionar]);
            }else{
              this.router.navigate(["home"]);
            }
          }
        },
        err => {
          console.log("nao deu para criar usuario");
          console.log(err);
        }
      );
  }

}
