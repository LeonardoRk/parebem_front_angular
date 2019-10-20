import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';  
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private formBuilder: FormBuilder,  
              private apiService: ApiService,
              private router: Router,
              private tokenService : TokenService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        nome:['', Validators.required],
        password:['', Validators.required]
    });
  }

  validarLogin(){
    const nome = this.loginForm.get('nome').value;
    const password = this.loginForm.get('password').value;
    
    this.apiService.validaLogin(nome, password)
      .subscribe(
        data => 
          {
            console.log("foi e voltou do servidor");
            console.log(data);
            if(data["status"] == "ok"){
              console.log("usuario com senha existente no banco");
              this.tokenService.setToken("true");
              this.router.navigate(["home"]);
            }else{
              alert("Usuário não cadastrado ou senha errada");
              this.loginForm.reset();
            }
          }
        ,
        err => {
          console.log("erro para autenticar")
          this.loginForm.reset();
        }
      );
  }

  createUser(){
    let routeToGo = "/";
    console.log("navegar para criar usuário pelo index");
    this.router.navigate(["criarUsuarios"], {state:{"route":routeToGo}});
  }

}
