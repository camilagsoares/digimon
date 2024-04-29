import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: 'registro', component: RegisterComponent},
    { path: 'post', component: PostComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },

];
