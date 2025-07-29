import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BreedsTableComponent } from './cats/breeds-table/breeds-table.component';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'breeds-table', component: BreedsTableComponent },
  { path: 'admin', component: HomeComponent,
    canActivate: [AuthGuard]
   }
];
