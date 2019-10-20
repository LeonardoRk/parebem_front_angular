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

    listarEventosAbertos(){
        return this.http.get(API + '/eventos/abertos');
    }

    validaLogin(nome:string, senha:string){
        return this.http.post(API + '/login', {nome, senha}, this.options);
    }

    createUser(nome:string, senha:string, telefone:string){
        return this.http.post(API + '/usuarios/criar', {nome,senha,telefone}, this.options);
    }

    createEvento(local:string, limite_convidados:string, momento:string){
        return this.http.post(API + '/eventos/criar', {local, limite_convidados, momento}, this.options);
    }

    infosPagCadastro(){
        return this.http.get(API + '/cadastros');
    }

    insereUsuarioEmEvento(id_usuario:number, id_evento:number){
        return this.http.post(API + '/cadastros/usuarioseventos',
                                 {id_usuario, id_evento}, this.options);
    }
}