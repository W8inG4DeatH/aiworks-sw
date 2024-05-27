import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BACKEND_URL } from 'src/app/constants';

@Injectable({
    providedIn: 'root',
})
export class TranslationProcessingApiFilesService {
    constructor(private http: HttpClient) {}

    sendForTranslation(
        projectDirectoryPath: string[],
        sourceFileName: string,
        sourceLanguage: string,
        targetLanguages: string[],
    ): Observable<any> {
        return this.http.post(`${BACKEND_URL}/api/google-cloud-translation`, {
            projectDirectoryPath,
            sourceFileName,
            sourceLanguage,
            targetLanguages,
        });
    }

    getTranslationProgress(language: string): Observable<any> {
        return interval(5000).pipe(
            switchMap(() => this.http.get(`${BACKEND_URL}/api/google-cloud-translation/progress/${language}`)),
        );
    }
}
