import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatBreed, CatImage } from '../models/cat-breed.interface';

@Injectable({
  providedIn: 'root'
})
export class CatApiService {
  private readonly baseUrl = 'https://api.thecatapi.com/v1';
  private readonly apiKey = 'live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC3';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las razas de gatos disponibles
   */
  getBreeds(): Observable<CatBreed[]> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });

    return this.http.get<CatBreed[]>(`${this.baseUrl}/breeds`, { headers });
  }

  /**
   * Obtiene imágenes de una raza específica
   */
  getBreedImages(breedId: string, limit: number = 10): Observable<CatImage[]> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });

    return this.http.get<CatImage[]>(`${this.baseUrl}/images/search`, {
      headers,
      params: {
        breed_ids: breedId,
        limit: limit.toString(),
        size: 'med'
      }
    });
  }

  /**
   * Obtiene una imagen específica por ID
   */
  getImageById(imageId: string): Observable<CatImage> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });

    return this.http.get<CatImage>(`${this.baseUrl}/images/${imageId}`, { headers });
  }
} 