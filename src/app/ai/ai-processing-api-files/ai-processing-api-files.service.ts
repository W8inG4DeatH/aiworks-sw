import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AiProcessingApiFilesService {
    constructor(private httpClient: HttpClient) {}

    async sendForAIModificationFiles(pathSegments: string[], myAIPrompt: string): Promise<{ message: string }> {
        const apiUrl = 'http://localhost:3000/aimodify';
        try {
            const response = await this.httpClient
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
