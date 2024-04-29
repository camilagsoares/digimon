import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  mostrarSenha: boolean = false;
  mostrarToast: boolean = false;
  usuarioLogado: boolean = false;

  onLoginSuccess(logado: boolean) {
    // Método chamado quando o evento de login bem-sucedido é emitido pelo componente de login
    this.usuarioLogado = logado;
  }


  // constructor() {
  //   // Verificar se o usuário já está logado ao carregar o componente
  //   this.verificarLogin();
  // }

  registrarUsuario() {
    if (this.nome && this.email && this.senha) {
      const usuario = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        token: this.generateToken(),
        dataCriacao: new Date()
      };

      localStorage.setItem('usuario', JSON.stringify(usuario));
      // localStorage.setItem('ultimoLogin', new Date().toISOString());

      const toast = document.querySelector('.toast.success-toast');
      if (toast) {
        toast.classList.add('active');
        setTimeout(() => {
          toast.classList.remove('active');
        }, 3000);
      }
      console.log('Usuário registrado com sucesso! Dados armazenados no localStorage.');

      // Após registrar o usuário, verificar o login novamente
      // this.verificarLogin();

    } else {
      const toast = document.querySelector('.toast.error-toast');
      if (toast) {
        toast.classList.add('active');
        setTimeout(() => {
          toast.classList.remove('active');
        }, 3000);
      }
    }
  }

  verificarLogin() {
    const ultimoLogin = localStorage.getItem('ultimoLogin');
    if (ultimoLogin) {
      // Se o último login existir, o usuário está logado
      console.log('Usuário está logado desde: ', new Date(ultimoLogin));
    } else {
      // Se o último login não existir, o usuário não está logado
      console.log('Usuário não está logado.');
    }
  }

  generateToken(): string {
    return Math.random().toString(36).substr(2);
  }

  togglePasswordVisibility(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }
}