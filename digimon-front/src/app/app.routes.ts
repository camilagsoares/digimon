import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'digimon/:name', component: PostComponent },

  // { path: 'post', component: PostComponent },

  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],


})
export class AppModule { }
