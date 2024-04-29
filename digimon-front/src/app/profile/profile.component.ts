import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  usuario: any;

  constructor(private authService: AuthService) {
    this.usuario = this.authService.getUsuarioFromLocalStorage();
  }
}
