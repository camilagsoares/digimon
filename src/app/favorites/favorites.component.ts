import { Component } from '@angular/core';
import { DigimonService } from '../services/digimon.service';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';
import { Digimon } from '../home/home.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule,FormsModule,NgIconComponent,],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favoriteDigimons: Digimon[] = [];

  constructor(private digimonService: DigimonService) { }

  ngOnInit(): void {
    this.loadFavoritesFromStorage();
  }

 loadFavoritesFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const favoritesData = localStorage.getItem('favorites');
      if (favoritesData) {
        try {
          this.favoriteDigimons = JSON.parse(favoritesData);
        } catch (error) {
          console.error('Error parsing favorites data:', error);
        }
      }
    } else {
      console.error('O localStorage não está disponível neste ambiente.');
    }
  }

  removeFavorite(digimon: Digimon): void {
    const index = this.favoriteDigimons.indexOf(digimon);
    if (index !== -1) {
      this.favoriteDigimons.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(this.favoriteDigimons));
    }
  }
}