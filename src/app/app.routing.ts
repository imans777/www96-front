import {RouterModule, Routes} from '@angular/router';
import {RegisterPageComponent} from './register-page/register-page.component';
import {ProfileComponent} from "./profile/profile.component";
import {NewPostComponent} from "./new-post/new-post.component";
import {ShowPostComponent} from "./show-post/show-post.component";
import {LoginComponent} from "./login/login.component";

const APP_ROUTES: Routes = [
  {path: 'register', component: RegisterPageComponent},
  {path: 'profile/:username', component: ProfileComponent},
  {path: 'new_post', component: NewPostComponent},
  {path: 'show_post/:username', component: ShowPostComponent},
  {path: 'login', component: LoginComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
