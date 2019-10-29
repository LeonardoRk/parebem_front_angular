import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, OnInit } from '@angular/core';

const API = 'http://localhost:8080';

@Injectable({ providedIn: 'root'})
export class ApiService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    private options = { headers: this.headers };

    constructor(private http: HttpClient){}
    
    listUsers(){
        return this.http.get(API + '/usuarios');
    }

    listEvents(){
        return this.http.get(API + '/eventos');
    }

    listOpenedEvents(){
        return this.http.get(API + '/eventos/abertos');
    }

    validaLogin(name:string, password:string){
        return this.http.post(API + '/login', {name, password}, this.options);
    }

    createUser(name:string, password:string, telephone:string){
        return this.http.post(API + '/usuarios/criar', {name,password,telephone}, this.options);
    }

    createEvent(place:string, guestLimit:string, expirationMoment:string){
        return this.http.post(API + '/eventos/criar', {place, guestLimit, expirationMoment}, this.options);
    }

    infosPagCadastro(){
        return this.http.get(API + '/cadastros');
    }

    insereUsuarioEmEvento(id_usuario:number, id_evento:number){
        return this.http.post(API + '/cadastros/usuarioseventos',
                                 {id_usuario, id_evento}, this.options);
    }
}