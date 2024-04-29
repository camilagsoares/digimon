import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  registrarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  isUsuarioLogado(): boolean {
    return !!localStorage.getItem('usuario');
  }



  logout() {
    localStorage.removeItem('usuario');
  }
}
