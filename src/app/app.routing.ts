import {RouterModule, Routes} from '@angular/router';
import {RegisterPageComponent} from './register-page/register-page.component';

const APP_ROUTES: Routes = [
  {path: 'register', component: RegisterPageComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
