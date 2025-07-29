import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CatApiService } from '../../services/cat-api.service';
import { CatBreed } from '../../models/cat-breed.interface';

@Component({
  selector: 'app-breeds-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './breeds-table.component.html',
  styleUrls: ['./breeds-table.component.css']
})
export class BreedsTableComponent implements OnInit, OnDestroy {
  public breeds: CatBreed[] = [];
  public filteredBreeds: CatBreed[] = [];
  public isLoading = false;
  public searchTerm = '';
  public sortBy = 'name';
  public sortDirection: 'asc' | 'desc' = 'asc';
  
  private destroy$ = new Subject<void>();
  
  constructor(private catApiService: CatApiService) {}
  
  ngOnInit(): void {
    this.loadBreeds();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  /**
   * Carga todas las razas de gatos
   */
  private loadBreeds(): void {
    this.isLoading = true;
    this.catApiService.getBreeds()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (breeds) => {
          this.breeds = breeds;
          this.filteredBreeds = [...breeds];
          this.sortBreeds();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading breeds:', error);
          this.isLoading = false;
        }
      });
  }
  
  /**
   * Filtra las razas basado en el término de búsqueda
   */
  public onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredBreeds = [...this.breeds];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredBreeds = this.breeds.filter(breed => 
        breed.name.toLowerCase().includes(term) ||
        breed.origin.toLowerCase().includes(term) ||
        breed.temperament.toLowerCase().includes(term)
      );
    }
    this.sortBreeds();
  }
  
  /**
   * Ordena las razas por la columna especificada
   */
  public sortByColumn(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.sortBreeds();
  }
  
  /**
   * Aplica el ordenamiento a las razas filtradas
   */
  private sortBreeds(): void {
    this.filteredBreeds.sort((a, b) => {
      let aValue: any;
      let bValue: any;
      
      switch (this.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'origin':
          aValue = a.origin.toLowerCase();
          bValue = b.origin.toLowerCase();
          break;
        case 'life_span':
          aValue = parseInt(a.life_span.split('-')[0]);
          bValue = parseInt(b.life_span.split('-')[0]);
          break;
        case 'adaptability':
          aValue = a.adaptability;
          bValue = b.adaptability;
          break;
        case 'affection_level':
          aValue = a.affection_level;
          bValue = b.affection_level;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (this.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }
  
  /**
   * Obtiene el icono de ordenamiento para una columna
   */
  public getSortIcon(column: string): string {
    if (this.sortBy !== column) {
      return '↕️';
    }
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
  
  /**
   * Obtiene el color de la barra de progreso basado en el valor
   */
  public getProgressColor(value: number): string {
    if (value >= 7) return 'bg-green-500';
    if (value >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  }
} 