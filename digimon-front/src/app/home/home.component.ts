import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DigimonService } from '../services/digimon.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionSearchOutline } from '@ng-icons/ionicons';


export interface Digimon {
  name: string;
  img: string;
  level: string;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule,FormsModule,NgIconComponent],
  templateUrl: './home.component.html',
  viewProviders: [provideIcons({  ionSearchOutline })],

  providers: [DigimonService],
  styleUrl: './home.component.css'
})
export class HomeComponent {

  digimonList: Digimon[] = [];
  filteredDigimonList: Digimon[] = [];
  pageSize = 10;
  currentPage = 1;
  shouldPaginate = true;
  searchName: string = '';

  constructor(private digimonService: DigimonService) {}

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

  searchByName(name: string) {
    if (name) {
      this.filteredDigimonList = this.digimonList.filter(digimon => digimon.name.toLowerCase().includes(name.toLowerCase()));
    } else {
      this.filteredDigimonList = [...this.digimonList];
    }
  }
} 