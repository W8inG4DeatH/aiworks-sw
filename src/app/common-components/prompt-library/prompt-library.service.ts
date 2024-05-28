import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAiFile } from 'src/app/common-components/common-components.interfaces';
import { BACKEND_URL } from 'src/app/constants';

@Injectable({
    providedIn: 'root',
})
export class PromptLibraryService {
    private apiUrl = `${BACKEND_URL}/api/files/txt`;

    constructor(private http: HttpClient) {}

    readAllTxtFiles(path: string): Observable<IAiFile[]> {
        return this.http.post<IAiFile[]>(`${this.apiUrl}/readall`, { path });
    }

    updateTxtFile(file: IAiFile): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/update`, file);
    }

    deleteTxtFile(file: IAiFile): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete`, { body: file });
    }
}
