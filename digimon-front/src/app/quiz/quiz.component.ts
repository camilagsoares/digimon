import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIconComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
 

  questions: Question[] = [
    {
      question: "Qual é o nome do protagonista principal de Digimon Adventure?",
      options: ["Taichi Yagami", "Yamato Ishida", "Takeru Takaishi", "Koushiro Izumi"],
      answer: "Taichi Yagami"
    },
    {
      question: "Qual é o nome do Digimon parceiro de Taichi Yagami?",
      options: ["Agumon", "Gabumon", "Tentomon", "Patamon"],
      answer: "Agumon"
    },
    {
      question: "Quem é o líder dos Digimon Adventure 02?",
      options: ["Davis Motomiya", "Ken Ichijouji", "Yolei Inoue", "Cody Hida"],
      answer: "Davis Motomiya"
    },
  ];

  currentQuestionIndex: number = 0;
  selectedOption: string | null = null;

  correctAnswers: number = 0;
  quizCompleted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  checkAnswer() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (this.selectedOption === currentQuestion.answer) {
      this.correctAnswers++;
    }
  

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.quizCompleted = true;
    }
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedOption = null; 
    this.correctAnswers = 0;
    this.quizCompleted = false;
  }
}