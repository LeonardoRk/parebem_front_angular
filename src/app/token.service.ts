import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    hasToken(){
        console.log("funcao tem token");
        return !!this.getToken();
    }

    setToken(token){
        window.localStorage.setItem(KEY, token);
    }

    getToken(){
        return window.localStorage.getItem(KEY);
    }

    removeToken(){
        console.log("fazendo desautenticação");
        window.localStorage.removeItem(KEY);
    }
}