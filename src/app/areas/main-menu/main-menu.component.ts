import { Component, OnInit } from '@angular/core';
import { IMainMenuElement } from 'src/app/areas/areas.interfaces';

@Component({
    selector: 'main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
    public mainMenu: Array<IMainMenuElement> = [];

    constructor() {}

    ngOnInit(): void {
        this.InitMainMenu();
    }

    InitMainMenu() {
        this.mainMenu = [
            {
                DisplayName: 'Dashboard',
                RouterLink: '/dashboard',
            },
            {
                DisplayName: 'AI API',
                RouterLink: '/ai-processing-api-files',
            },
            {
                DisplayName: 'Teams AI Bot',
                RouterLink: '/teams-chats-processing',
            },
            {
                DisplayName: 'Translation API',
                RouterLink: '/translation-processing-api-files',
            },
            {
                DisplayName: 'Web Security',
                RouterLink: '/web-security-testing',
            },
        ];
    }
}
