import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DigimonService } from '../services/digimon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionSearchOutline } from '@ng-icons/ionicons';
import { ionCloseCircleOutline } from '@ng-icons/ionicons'


export interface Digimon {
  name: string;
  img: string;
  level: string;
  isMouseOver?: boolean;
  isFavorite?: boolean;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule,FormsModule,NgIconComponent,],
  templateUrl: './home.component.html',
  viewProviders: [provideIcons({  ionSearchOutline,ionCloseCircleOutline })],
  providers: [DigimonService],
  styleUrl: './home.component.css'
})
export class HomeComponent {

  digimonList: Digimon[] = [];
  filteredDigimonList: Digimon[] = [];
  // pageSize = 10;
  // currentPage = 1;
  shouldPaginate = true;
  searchName: string = '';
  selectedDigimon: Digimon | null = null;
  selectedDigimonName: string = '';
  favoriteButtonStates: { [key: string]: boolean } = {};

  constructor(private digimonService: DigimonService,private router: Router) {}

  ngOnInit() {
    this.loadAllDigimon();
    this.loadFavoritesFromStorage(); 
  }

  loadAllDigimon() {
    this.digimonService.getDigimon().subscribe((data: Digimon[]) => {
      this.digimonList = data;
      this.filteredDigimonList = [...this.digimonList];
    });
  }

  filterByLevel(level: string) {
    if (level === 'All') {
      this.filteredDigimonList = [...this.digimonList];
    } else {
      this.filteredDigimonList = this.digimonList.filter(digimon => digimon.level === level);
    }
  }

  clearFilter() {
    this.filteredDigimonList = [...this.digimonList];
  }

  searchByName(name: string) {
    if (name) {
      this.filteredDigimonList = this.digimonList.filter(digimon => digimon.name.toLowerCase().includes(name.toLowerCase()));
    } else {
      this.filteredDigimonList = [...this.digimonList];
    }
  
    if (this.filteredDigimonList.length === 0 && name) {
      // this.shouldPaginate = false; 
    } else {
      // this.shouldPaginate = true;
    }
  }
  

  openModal(digimon: Digimon) {
    this.selectedDigimon = digimon;
  }

  closeModal() {
    this.selectedDigimon = null;
  }

  navigateToDetail(digimon: Digimon) {
    this.router.navigate(['/digimon', digimon.name], { state: { data: digimon } });
  }
  
  toggleFavorite(digimon: Digimon) {
    digimon.isFavorite = !digimon.isFavorite;
    this.saveFavoritesToStorage();
  }

  saveFavoritesToStorage() {
    const favorites = this.digimonList.filter(digimon => digimon.isFavorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  loadFavoritesFromStorage() {
    if (typeof localStorage !== 'undefined') {
      const favoritesData = localStorage.getItem('favorites');
      if (favoritesData) {
        const favorites: Digimon[] = JSON.parse(favoritesData);
        for (const favorite of favorites) {
          const existingDigimon = this.digimonList.find(digimon => digimon.name === favorite.name);
          if (existingDigimon) {
            existingDigimon.isFavorite = true;
          }
        }
      }
    } else {
      console.log('localStorage is not available.');
    }
  }
  
}