import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { DigimonService } from './Digimon.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

export interface Digimon {
  name: string;
  img: string;
  level: string;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  providers: [DigimonService],
  styleUrl: './app.component.css',

})
export class AppComponent {

  digimonList: Digimon[] = [];
  filteredDigimonList: Digimon[] = [];
  pageSize = 10;
  currentPage = 1;

  constructor(private digimonService: DigimonService) { }

 
  ngOnInit() {
    this.loadAllDigimon();
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

}
