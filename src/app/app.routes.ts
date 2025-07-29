import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BreedsTableComponent } from './cats/breeds-table/breeds-table.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'breeds-table', component: BreedsTableComponent }
];
