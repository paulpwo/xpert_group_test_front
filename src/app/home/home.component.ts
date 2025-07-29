import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CatApiService } from '../services/cat-api.service';
import { CatBreed, CatImage } from '../models/cat-breed.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public breeds: CatBreed[] = [];
  public selectedBreed: CatBreed | null = null;
  public breedImages: CatImage[] = [];
  public isLoading = false;
  public isLoadingImages = false;
  public currentImageIndex = 0;
  
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
   * Carga todas las razas disponibles
   */
  private loadBreeds(): void {
    this.isLoading = true;
    this.catApiService.getBreeds()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (breeds) => {
          this.breeds = breeds;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading breeds:', error);
          this.isLoading = false;
        }
      });
  }
  
  /**
   * Maneja el cambio en el select de razas
   */
  public onBreedSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const breedId = target.value;
    this.onBreedSelect(breedId);
  }
  
  /**
   * Maneja la selección de una raza
   */
  public onBreedSelect(breedId: string): void {
    const selectedBreed = this.breeds.find(breed => breed.id === breedId);
    if (selectedBreed) {
      this.selectedBreed = selectedBreed;
      this.loadBreedImages(breedId);
    }
  }
  
  /**
   * Carga las imágenes de la raza seleccionada
   */
  private loadBreedImages(breedId: string): void {
    this.isLoadingImages = true;
    this.currentImageIndex = 0;
    
    this.catApiService.getBreedImages(breedId, 10)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (images) => {
          this.breedImages = images;
          this.isLoadingImages = false;
        },
        error: (error) => {
          console.error('Error loading breed images:', error);
          this.isLoadingImages = false;
        }
      });
  }
  
  /**
   * Navega a la imagen anterior en el carrusel
   */
  public previousImage(): void {
    if (this.breedImages.length > 0) {
      this.currentImageIndex = this.currentImageIndex > 0 
        ? this.currentImageIndex - 1 
        : this.breedImages.length - 1;
    }
  }
  
  /**
   * Navega a la imagen siguiente en el carrusel
   */
  public nextImage(): void {
    if (this.breedImages.length > 0) {
      this.currentImageIndex = this.currentImageIndex < this.breedImages.length - 1 
        ? this.currentImageIndex + 1 
        : 0;
    }
  }
  
  /**
   * Va a una imagen específica del carrusel
   */
  public goToImage(index: number): void {
    if (index >= 0 && index < this.breedImages.length) {
      this.currentImageIndex = index;
    }
  }
  
  /**
   * Obtiene la imagen actual del carrusel
   */
  public get currentImage(): CatImage | null {
    return this.breedImages.length > 0 ? this.breedImages[this.currentImageIndex] : null;
  }
} 