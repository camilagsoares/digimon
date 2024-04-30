import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [DatePipe]

})
export class ProfileComponent {
  usuario: any;

  constructor(private authService: AuthService, private datePipe: DatePipe) {
    this.usuario = this.authService.getUsuarioFromLocalStorage();
  }
}
