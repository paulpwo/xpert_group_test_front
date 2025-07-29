import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { HomeService } from './services/home.service';
import { Feature } from './models/feature.interface';
import { HOME_CONSTANTS } from './constants/home.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  public features: Feature[] = [];
  public isLoading = true;
  public readonly constants = HOME_CONSTANTS;
  
  private destroy$ = new Subject<void>();
  
  constructor(private homeService: HomeService) {}
  
  ngOnInit(): void {
    this.loadFeatures();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  /**
   * Carga las características desde el servicio
   */
  private loadFeatures(): void {
    this.homeService.getFeatures()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (features) => {
          this.features = features;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading features:', error);
          this.isLoading = false;
        }
      });
  }
  
  /**
   * Maneja el click del botón principal
   */
  public onPrimaryButtonClick(): void {
    // TODO: Implementar navegación o acción
    console.log('Primary button clicked');
  }
  
  /**
   * Maneja el click del botón secundario
   */
  public onSecondaryButtonClick(): void {
    // TODO: Implementar navegación o acción
    console.log('Secondary button clicked');
  }
} 