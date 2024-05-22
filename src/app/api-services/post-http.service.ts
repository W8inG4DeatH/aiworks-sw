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

    async sendForAIModificationFiles(pathSegments: string[], myAIPrompt: string): Promise<{ message: string }> {
        const apiUrl = 'http://localhost:3000/aimodify';
        try {
            const response = await this.http
                .post<{ message: string }>(apiUrl, { pathSegments, myAIPrompt })
                .toPromise();
            if (!response) {
                throw new Error('No response received from server.');
            }
            return response;
        } catch (error) {
            console.error('Error sending request to server:', error);
            throw error;
        }
    }
}
