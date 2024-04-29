import { CommonModule } from '@angular/common';
import { Component,Output, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  fazerLogin() {
    if (this.authService.login(this.email, this.senha)) {
      // Redirecione para a página de perfil ou outra página após o login
      console.log('Login bem-sucedido!');
    } else {
      console.log('Credenciais inválidas. Tente novamente.');
    }
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }
}
