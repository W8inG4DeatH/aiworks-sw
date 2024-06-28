import { Component, OnInit } from '@angular/core';
import { TeamsChatsProcessingService } from './teams-chats-processing.service';
import { ITeamsChat } from './teams-chats-proccessing.interfaces';

@Component({
    selector: 'app-teams-chats-processing',
    templateUrl: './teams-chats-processing.component.html',
    styleUrls: ['./teams-chats-processing.component.scss'],
})
export class TeamsChatsProcessingComponent implements OnInit {
    chats: ITeamsChat[] = [];
    selectedChat: ITeamsChat | null = null;
    summary: string = '';
    answer: string = '';

    constructor(private teamsChatsProcessingService: TeamsChatsProcessingService) {}

    ngOnInit() {
        this.loadChats();
    }

    loadChats() {
        this.teamsChatsProcessingService.getChats().subscribe(
            (data) => {
                console.log('Chats data:', data);
                this.chats = data;
            },
            (error) => {
                console.error('Error loading chats:', error);
            },
        );
    }

    selectChat(chat: ITeamsChat) {
        this.selectedChat = chat;
    }

    summarizeChat() {
        if (this.selectedChat) {
            this.teamsChatsProcessingService.summarizeChat(this.selectedChat.id).subscribe(
                (data) => {
                    console.log('Summary data:', data);
                    this.summary = data.summary;
                },
                (error) => {
                    console.error('Error summarizing chat:', error);
                },
            );
        }
    }

    answerChat() {
        if (this.selectedChat) {
            this.teamsChatsProcessingService.answerChat(this.selectedChat.id).subscribe(
                (data) => {
                    console.log('Answer data:', data);
                    this.answer = data.answer;
                },
                (error) => {
                    console.error('Error answering chat:', error);
                },
            );
        }
    }
}

