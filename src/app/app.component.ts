import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DigimonService } from './services/digimon.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionSearchOutline } from '@ng-icons/ionicons';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, HeaderComponent, NgIconComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  viewProviders: [provideIcons({ ionSearchOutline })],
  providers: [DigimonService],
  styleUrl: './app.component.css',


})

export class AppComponent {



}
