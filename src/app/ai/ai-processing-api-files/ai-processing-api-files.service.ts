import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAiFile } from 'src/app/common-components/common-components.interfaces';
import { BACKEND_URL } from 'src/app/constants';

@Injectable({
    providedIn: 'root',
})
export class AiProcessingApiFilesService {
    private apiUrl = `${BACKEND_URL}/aiprocess`;

    constructor(private http: HttpClient) {}

    sendFilesForAIProcess(files: IAiFile[], myAIPrompt: string): Observable<any> {
        const body = {
            files,
            myAIPrompt,
        };
        return this.http.post(`${this.apiUrl}`, body);
    }

    sendFilesForAIProcessTokens(files: IAiFile[], myAIPrompt: string): Observable<IAiFile[]> {
        const body = {
            files,
            myAIPrompt,
        };
        return this.http.post<IAiFile[]>(`${this.apiUrl}/tokens`, body);
    }
}
