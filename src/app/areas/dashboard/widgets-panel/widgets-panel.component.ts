import { Component, OnInit } from '@angular/core';
import { PostHttpService } from '../../../api-services/post-http.service';

@Component({
    selector: 'app-widgets-panel',
    templateUrl: './widgets-panel.component.html',
    styleUrls: ['./widgets-panel.component.scss'],
})
export class WidgetsPanelComponent implements OnInit {
    public translatedJson: any;

    constructor(private postHttpService: PostHttpService) {}

    ngOnInit(): void {}

    async onTranslate() {
        try {
            const targetLanguage = 'de-DE'; // target language
            console.log('targetLanguage:', targetLanguage);
            // Load the JSON file from assets
            const jsonFile = await this.postHttpService.getJsonFileData(targetLanguage);
            console.log('getJsonFileData:', jsonFile);
            // Send the JSON file to the backend for translation
            const translated = await this.postHttpService.sendForTranslation(jsonFile, targetLanguage);
            console.log('translated:', translated);
            // Assign the translated JSON to a variable
            this.translatedJson = translated;
            console.log('this.translatedJson:', this.translatedJson);
        } catch (error) {
            console.error('Error during translation:', error);
        }
    }

    async onAIModificationFiles() {
        try {
            const projectDirectoryPath = ['c:', 'sw-api-test', 'src'];
            const modifyResponse = await this.postHttpService.sendForAIModificationFiles(projectDirectoryPath);
            console.log('modifyResponse:', modifyResponse);
        } catch (error) {
            console.error('Error during AI modification:', error);
        }
    }
}
