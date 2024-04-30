import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterOutlet,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }

  isLogged(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('isLogged') === 'true';
    }
    return false;
  }
}
