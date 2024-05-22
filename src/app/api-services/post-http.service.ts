import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostHttpService {
  constructor(private http: HttpClient) {}

  getJsonFileData(targetLanguage: string) {
    const jsonPath = 'assets/locales/source.json';
    return this.http.get(jsonPath).toPromise();
  }

  sendForTranslation(text: any, targetLanguage: string) {
    const apiUrl = 'http://localhost:3000/translate';
    return this.http.post(apiUrl, { text, targetLanguage }).toPromise();
  }

  sendForAIModificationFiles(pathSegments: string[]) {
    const apiUrl = 'http://localhost:3000/aimodify';
    return this.http.post(apiUrl, { pathSegments }).toPromise();
  }
}
