import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DigimonService } from './services/digimon.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionSearchOutline } from '@ng-icons/ionicons';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,NgIconComponent],
  templateUrl: './app.component.html',
  viewProviders: [provideIcons({  ionSearchOutline })],
  providers: [DigimonService],
  styleUrl: './app.component.css',

})
export class AppComponent {



}
