import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private http: HttpClient) {}

  translateJson(targetLanguage: string) {
    // Ścieżka do Twojego lokalnego pliku JSON
    const jsonPath = 'assets/locales/en.json';
    return this.http.get(jsonPath).toPromise();
  }

  sendForTranslation(text: any, targetLanguage: string) {
    // URL do Twojego endpointu tłumaczącego w backendzie
    const apiUrl = 'http://localhost:3000/translate';
    return this.http.post(apiUrl, { text, targetLanguage }).toPromise();
  }
}
