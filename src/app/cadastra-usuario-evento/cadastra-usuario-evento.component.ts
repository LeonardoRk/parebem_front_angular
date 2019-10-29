import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ElementFinder } from 'protractor';
import { TokenService } from '../token.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cadastra-usuario-evento',
  templateUrl: './cadastra-usuario-evento.component.html',
  styleUrls: ['./cadastra-usuario-evento.component.css']
})
export class CadastraUsuarioEventoComponent implements OnInit {

  private eventos = [];
  private usuarios = [];
  private usuarios_evento = {};
  private usuariosNRelacionados = {};
  private numberOfOpenedEvents = -1;
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
        this.apiService.listOpenedEvents()
          .subscribe(
            data =>{
              console.log("incoming data");
              console.log(data);
              let dataString = JSON.stringify(data);
              let openedEvents = JSON.parse(dataString);
              openedEvents = openedEvents["opened_events"]
              console.log("openedEvents");
              console.log(openedEvents);
              if(this.numberOfOpenedEvents == -1){
                this.numberOfOpenedEvents = openedEvents.length;
              }else if(this.numberOfOpenedEvents != openedEvents.length){
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
    forkJoin(
      this.apiService.infosPagCadastro(),
      this.apiService.listUsers(),
    ).subscribe(([data, users]) => {
      console.log("conversão deu certo");
          
      let dict = {}
      dict = JSON.parse(JSON.stringify(data));
     
      for (var event in dict) {
        // check if the property/key is defined in the object itself, not in parent
        if (dict.hasOwnProperty(event)) {  
            this.eventos.push(JSON.parse(event));

            let e = JSON.parse(event);
            this.usuarios_evento[e['eventId']] = dict[event];
        }
      }

      let usersString = JSON.stringify(users);
      this.usuarios = JSON.parse(usersString)["all_users"];
      console.log("all users");
      console.log(this.usuarios);

      for(var i in this.eventos){
        console.log("events id");
        console.log(this.eventos[i]["eventId"]);
        let dic = this.usuariosForaEvento(this.eventos[i]["eventId"]);
        console.log("users out of event ");
        console.log(dic);
        this.usuariosNRelacionados[this.eventos[i]["eventId"]] = dic;
        if(this.eventos[i]["state"] === "ABERTO"){
          this.desabilitado[this.eventos[i]["eventId"]] = false;
          this.textoPlaceholder[this.eventos[i]["eventId"]] = "Escolha um usuário";
        }else{
          this.desabilitado[this.eventos[i]["eventId"]] = true;
          this.textoPlaceholder[this.eventos[i]["eventId"]] = "Evento fechado";
        }
        console.log("nomes nos eventos");
        let arrayPresentes = this.usuarios_evento[this.eventos[i]["eventId"]];
        arrayPresentes = JSON.parse(arrayPresentes);
        console.log(arrayPresentes);
        console.log("qtd usuarios: " + arrayPresentes.length);
        if(arrayPresentes.length >= this.eventos[i]["guestLimit"]){
          if(this.desabilitado[this.eventos[i]["eventId"]] == false){
            this.desabilitado[this.eventos[i]["eventId"]] = true;
            this.textoPlaceholder[this.eventos[i]["eventId"]] = "Limite atingido";
          }
        }
        console.log(this.eventos[i]["limite_convidados"]);
      }

    });
    
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
      let nomeMaior = JSON.parse(this.usuarios[m])["name"];
     
      for(let i = 0 ; i < usuariosDoEvento.length; i++){
        let nome = usuariosDoEvento[i]["name"];
        if(nomeMaior == nome){
          encontrou = true;
        }
      }
      console.log("encontrou:" + encontrou);
      if(!encontrou){
        id_nome[JSON.parse(this.usuarios[m])["user_id"]] = nomeMaior;
      }
    }
    console.log("id_nome");
    console.log(id_nome);
    return id_nome;
  }
 
}
