import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'pb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges{

  private users;
  private events;
  private qtdEventosAbertos = -1;
  constructor(private apiService: ApiService, 
              private route: Router, private tokeService:TokenService) {
    if(!this.tokeService.hasToken()){
      this.route.navigate(['']);
    }else{
      console.log("caindo no else para carregar");
      setInterval(()=> {
        this.apiService.listarEventosAbertos()
          .subscribe(
            data =>{
              let dataString = JSON.stringify(data);
              let eventosAbertos = JSON.parse(dataString);
              if(this.qtdEventosAbertos == -1 || 
                  this.qtdEventosAbertos != eventosAbertos.length){
                this.qtdEventosAbertos = eventosAbertos.length;
                console.log("setando novamente eventos");
                this.setaeventos();
              }
  
              for(let i = 0 ; i < eventosAbertos.length; i++){
                console.log(eventosAbertos[i]["local"]);
              }
            },
            err => {
              console.log(err);
            }
          );
      } , 1000);
    }
   }

  ngOnInit(){
    console.log("on init home");
    this.setausuarios();
    this.setaeventos();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("on changes");
    if(changes.users){
      this.setausuarios();
    }

    if(changes.events){
      this.setaeventos();
    }

    if(changes.eventosAbertos){
      console.log("mudaram eventos abertos");
      this.route.navigate(["home"]);
    }
  }

  private setaeventos(){
    this.apiService.listEvents()
      .subscribe(
        (data) => {
          console.log("chegou lista de eventos");
          console.log(data);
          this.events = data;
        },
        err => {
          console.log("Erro em eventos"); 
          console.log(err);
        }       
      );
  }

  

  private setausuarios(){
    this.apiService.listUsers()
      .subscribe(
        (data) => {
          console.log("chegou lista de usuários");
          console.log(data);
          this.users = data;
        },
        err => {
          console.log("erro em usuarios");
          console.log(err);
        }
      );
  }

}
