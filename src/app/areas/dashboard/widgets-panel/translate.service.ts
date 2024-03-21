import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private http: HttpClient) {}

  translateJson(targetLanguage: string) {
    const jsonPath = 'assets/locales/source.json';
    return this.http.get(jsonPath).toPromise();
  }

  sendForTranslation(text: any, targetLanguage: string) {
    const apiUrl = 'http://localhost:3000/translate';
    return this.http.post(apiUrl, { text, targetLanguage }).toPromise();
  }
}
