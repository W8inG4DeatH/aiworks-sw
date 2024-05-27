import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TranslationProcessingApiFilesService {
    constructor(private httpClient: HttpClient) {}

    getJsonFileData(targetLanguage: string) {
        const jsonPath = 'assets/locales/source.json';
        return this.httpClient.get(jsonPath).toPromise();
    }

    sendForTranslation(text: any, targetLanguage: string) {
        const apiUrl = 'http://localhost:3000/translate';
        return this.httpClient.post(apiUrl, { text, targetLanguage }).toPromise();
    }
}
