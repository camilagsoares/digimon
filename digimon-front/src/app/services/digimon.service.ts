import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, toArray } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DigimonService {
  private apiUrl = 'https://digimon-api.vercel.app/api/digimon';

  constructor(private http: HttpClient) { }

  getDigimon(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getDigimonByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/name/${name}`);
  }
  
  
}
