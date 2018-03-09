import {RouterModule, Routes} from '@angular/router';
import {RegisterPageComponent} from './register-page/register-page.component';

const APP_ROUTES: Routes = [
  {path: '', loadChildren: 'app/site/site.module#SiteModule'},
  {path: 'register', component: RegisterPageComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
