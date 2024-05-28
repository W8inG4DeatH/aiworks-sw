import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAiFile } from 'src/app/common-components/common-components.interfaces';
import { BACKEND_URL } from 'src/app/constants';

@Injectable({
    providedIn: 'root',
})
export class FileChooserService {
    constructor(private httpClient: HttpClient) {}

    searchFiles(path: string, fileExtension: string, filters: string[]): Observable<IAiFile[]> {
        return this.httpClient.post<IAiFile[]>(`${BACKEND_URL}/api/files/search`, { path, fileExtension, filters });
    }
}
