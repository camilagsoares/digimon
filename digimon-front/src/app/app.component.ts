import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
    <div *ngFor="let digimon of digimons">
      <h1>{{digimon.name}}</h1>
      <p>{{digimon.description}}</p>
    </div>
  `,
})
export class AppComponent {
  title = 'digimon-front';
  digimon: any;

  constructor(private http: HttpClient) {
    this.getDigimon();
  }

  getDigimon() {
    this.http.get('https://digi-api.com/api/v1/digimon').subscribe(data => {
      this.digimon = data;
      console.log(data)
    });
  }
}
