import { Component, OnInit, OnChanges, SimpleChanges, ComponentFactoryResolver } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { User } from '../User';

@Component({
  selector: 'pb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges{

  private users: User[] = [];
  private events: Event[] = [];
  private qtdEventosAbertos = -1;
  constructor(private apiService: ApiService, 
              private route: Router, private tokeService:TokenService) {
    if(!this.tokeService.hasToken()){
      this.route.navigate(['']);
    }else{
      console.log("caindo no else para carregar");
      setInterval(()=> {
        console.log("updating");
        this.apiService.listOpenedEvents()
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
          let dataString = JSON.stringify(data);
          let dataJson = JSON.parse(dataString);
          let events = dataJson["all_events"];

          let all_events = [];
          Object.keys(events).forEach(function(key) {
            let json = JSON.parse(events[key]);
            console.log(json);
            all_events.push(json);
          });
          this.events = all_events;
          console.log("this.events");
          console.log(this.events);
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
         
          console.log(typeof(data));
          let dataString = JSON.stringify(data);
         

          let dataJson = JSON.parse(dataString);
          
          let users = dataJson["all_users"];
          console.log(users);
         
          console.log(typeof(users));
         
          let all_users = [];
          Object.keys(users).forEach(function(key) {
            let json = JSON.parse(users[key]);
            console.log(json);
            all_users.push(json);
          });
          this.users = all_users;
          console.log("this.users");
          console.log(this.users);
        },
        err => {
          console.log("erro em usuarios");
          console.log(err);
        }
      );
  }

}
