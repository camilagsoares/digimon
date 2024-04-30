import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { QuizComponent } from './quiz/quiz.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'digimon/:name', component: PostComponent },
  { path: 'game', component: GameComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
})
export class AppModule { }
