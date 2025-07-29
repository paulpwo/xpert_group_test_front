import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {  provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

import { routes } from './app.routes';
import { AuthGuard } from './guards/auth-guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    AuthGuard,
  ]
};
