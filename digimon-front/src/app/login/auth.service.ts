import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: any; 

  constructor() { }

  login(email: string, senha: string): boolean {
    // Verifique se o usuário e senha correspondem aos armazenados no localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.email === email && usuario.senha === senha) {
      this.usuario = usuario;
      localStorage.setItem('isLogged', 'true');
        console.log('Usuário logado:', this.usuario); 
      return true;
    } else {
      return false;
    }
  }

  getUsuario(): any {
    console.log('Informações do usuário:', this.usuario);

    return this.usuario;
  }

  
  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('isLogged');
    }
  }

  isLogged(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('isLogged') === 'true';
    }
    return false;
  }

  getUsuarioFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }
  
}
