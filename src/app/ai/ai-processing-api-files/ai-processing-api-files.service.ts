import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAiFile } from 'src/app/common-components/file-chooser/file-chooser.interfaces';

@Injectable({
    providedIn: 'root',
})
export class AiProcessingApiFilesService {
    private apiUrl = 'http://localhost:3000/aimodify';

    constructor(private http: HttpClient) {}

    sendForAIModificationFiles(files: IAiFile[], myAIPrompt: string): Observable<any> {
        const body = {
            files,
            myAIPrompt,
        };
        return this.http.post(`${this.apiUrl}`, body);
    }
}
