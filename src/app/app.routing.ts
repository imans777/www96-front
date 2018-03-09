import {RouterModule, Routes} from '@angular/router';
import {RegisterPageComponent} from './register-page/register-page.component';
import {ProfileComponent} from "./profile/profile.component";

const APP_ROUTES: Routes = [
  {path: 'register', component: RegisterPageComponent},
  {path: 'profile', component: ProfileComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
