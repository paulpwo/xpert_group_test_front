import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feature } from '../models/feature.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  /**
   * Obtiene las características de la empresa
   * @returns Observable con las características
   */
  getFeatures(): Observable<Feature[]> {
    const features: Feature[] = [
      {
        id: '1',
        title: 'Soluciones Rápidas',
        description: 'Implementamos soluciones tecnológicas de manera eficiente y efectiva.',
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        iconColor: 'primary'
      },
      {
        id: '2',
        title: 'Calidad Garantizada',
        description: 'Nuestros productos cumplen con los más altos estándares de calidad.',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        iconColor: 'success'
      },
      {
        id: '3',
        title: 'Soporte 24/7',
        description: 'Estamos disponibles para ayudarte en cualquier momento del día.',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        iconColor: 'secondary'
      }
    ];
    
    return of(features);
  }
} 