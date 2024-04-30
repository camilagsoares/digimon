import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Digimon {
  name: string;
  img: string;
  flipped: boolean;
  matched: boolean;
}


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  apiUrl = 'https://digimon-api.vercel.app/api/digimon';
  digimons: Digimon[] = [];
  flippedCards: Digimon[] = [];
  matchedCards: Digimon[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDigimons();
  }

  async loadDigimons() {
    try {
      const data: any = await this.http.get(this.apiUrl).toPromise();
      const digimonData: any[] = data.map((digimon: any) => ({ name: digimon.name, img: digimon.img, flipped: false, matched: false }));
      this.digimons = this.shuffle([...digimonData, ...digimonData]);
    } catch (error) {
      console.error('Erro ao buscar Digimons:', error);
    }
  }

  shuffle(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  flipCard(index: number) {
    const card = this.digimons[index];
    if (!card.flipped && !card.matched && this.flippedCards.length < 2) {
      card.flipped = true;
      this.flippedCards.push(card);
      if (this.flippedCards.length === 2) {
        setTimeout(() => this.checkForMatch(), 3000); // Tempo de 3 segundos
      }
    }
  }

  checkForMatch() {
    const [firstCard, secondCard] = this.flippedCards;
    if (firstCard.name === secondCard.name) {
      this.matchedCards.push(...this.flippedCards);
      if (this.matchedCards.length === this.digimons.length) {
        alert('Parabéns! Você encontrou todos os pares!');
      }
    } else {
      this.flipBackCards();
    }
    this.flippedCards = [];
  }

  flipBackCards() {
    this.flippedCards.forEach(card => card.flipped = false);
  }

}
