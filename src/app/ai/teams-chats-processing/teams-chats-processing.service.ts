import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITeamsChat } from './teams-chats-proccessing.interfaces';
import { BACKEND_URL } from 'src/app/constants';

@Injectable({
    providedIn: 'root',
})
export class TeamsChatsProcessingService {
    private apiUrl = `${BACKEND_URL}/teamschats`;

    constructor(private http: HttpClient) {}

    getChats(): Observable<ITeamsChat[]> {
        return this.http.get<ITeamsChat[]>(this.apiUrl);
    }

    summarizeChat(chatId: string): Observable<{ summary: string }> {
        const body = { chatId };
        return this.http.post<{ summary: string }>(`${this.apiUrl}/summarize`, body);
    }

    answerChat(chatId: string): Observable<{ answer: string }> {
        const body = { chatId };
        return this.http.post<{ answer: string }>(`${this.apiUrl}/answer`, body);
    }
}

