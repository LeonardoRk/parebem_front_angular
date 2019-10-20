import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ElementFinder } from 'protractor';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-cadastra-usuario-evento',
  templateUrl: './cadastra-usuario-evento.component.html',
  styleUrls: ['./cadastra-usuario-evento.component.css']
})
export class CadastraUsuarioEventoComponent implements OnInit {

  private eventos = [];
  private usuarios = [];
  private usuarios_evento = [];
  private usuariosNRelacionados = {};
  private qtdEventosAbertos = -1;
  private desabilitado= {};
  private textoPlaceholder = {};

  constructor(private apiService: ApiService, 
              private router:Router, private tokenService:TokenService) { 
    
    if(!this.tokenService.hasToken()){
      console.log("não está logado")
      this.router.navigate(['']);
    }else{
      setInterval(()=> {
        console.log("verifica mudancas em eventos");
        this.apiService.listarEventosAbertos()
          .subscribe(
            data =>{
              let dataString = JSON.stringify(data);
              let eventosAbertos = JSON.parse(dataString);
              if(this.qtdEventosAbertos == -1){
                this.qtdEventosAbertos = eventosAbertos.length;
              }else if(this.qtdEventosAbertos != eventosAbertos.length){
                console.log("setando novamente eventos");
                this.atualizaDadosLocais();
              }
            },
            err => {
              console.log(err);
            }
          );
      }, 1000);
    }
  }

  ngOnInit() {
    this.atualizaDadosLocais();
  }

  atualizaDadosLocais(){
    this.apiService.infosPagCadastro()
      .subscribe(
        data => {
          console.log("conversão deu certo");
          this.eventos = data["eventos"];
          this.usuarios = data["usuarios"];
          this.usuarios_evento = data["usuarios_evento"];
          for(let i = 0 ; i < this.eventos.length; i++){
            let dic = this.usuariosForaEvento(this.eventos[i]["id_evento"]);
            this.usuariosNRelacionados[this.eventos[i]["id_evento"]] = dic;
            if(this.eventos[i]["vencido"] == 0){
              this.desabilitado[this.eventos[i]["id_evento"]] = false;
              this.textoPlaceholder[this.eventos[i]["id_evento"]] = "Escolha um usuário";
            }else{
              this.desabilitado[this.eventos[i]["id_evento"]] = true;
              this.textoPlaceholder[this.eventos[i]["id_evento"]] = "Evento fechado";
            }
            console.log("nomes nos eventos");
            let arrayPresentes = this.usuarios_evento[this.eventos[i]["id_evento"]];
            arrayPresentes = JSON.parse(arrayPresentes);
            console.log(arrayPresentes);
            console.log("qtd usuarios: " + arrayPresentes.length);
            if(arrayPresentes.length >= this.eventos[i]["limite_convidados"]){
              if(this.desabilitado[this.eventos[i]["id_evento"]] == false){
                this.desabilitado[this.eventos[i]["id_evento"]] = true;
                this.textoPlaceholder[this.eventos[i]["id_evento"]] = "Limite atingido";
              }
            }
            console.log(this.eventos[i]["limite_convidados"]);
          }
        },
        err => {
          console.log(err);
        }
    );
  }

  onSelected(respostaFilho){
    let dados = JSON.parse(respostaFilho);
    this.insereUsuarioNoEvento(dados["id_usuario"], dados["id_evento"]);
  }

  insereUsuarioNoEvento = function(id_usuario, id_evento){
    
    console.log("id_usuario e id_evento " + id_usuario + " " + id_evento);
    this.apiService.insereUsuarioEmEvento(id_usuario, id_evento)
        .subscribe(
          data => {
            let dataString = JSON.stringify(data);
            let json = JSON.parse(dataString);
            console.log("A data que chegou do servidor foi: ");
            console.log(json);
            console.log("recarregar página")
            this.atualizaDadosLocais();
          },
          err => {
            console.log("erro para inserir usuário em evento");
            console.log(err);
          }
    );
  }

  usuariosForaEvento(idEvento){
    let id_nome = {};
    let usuariosDoEvento = this.usuarios_evento[idEvento];
    usuariosDoEvento = JSON.parse(usuariosDoEvento);


    for(let m = 0 ; m < this.usuarios.length; m++){
      let encontrou = false;
      let nomeMaior = this.usuarios[m]["nome"];
      for(let i = 0 ; i < usuariosDoEvento.length; i++){
        let nome = usuariosDoEvento[i]["nome"];
        if(nomeMaior == nome){
          encontrou = true;
        }
      }
      if(!encontrou){
        id_nome[this.usuarios[m]["id_usuario"]] = nomeMaior;
      }
    }
    
    return id_nome;
  }
 
}
