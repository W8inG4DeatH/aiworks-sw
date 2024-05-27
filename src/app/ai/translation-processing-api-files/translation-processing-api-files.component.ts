import { Component, OnInit } from '@angular/core';
import { TranslationProcessingApiFilesService } from './translation-processing-api-files.service';

@Component({
    selector: 'translation-processing-api-files',
    templateUrl: './translation-processing-api-files.component.html',
    styleUrls: ['./translation-processing-api-files.component.css'],
})
export class TranslationProcessingApiFilesComponent implements OnInit {
    public translatedJson: any;

    constructor(private translationProcessingApiFilesService: TranslationProcessingApiFilesService) {}

    ngOnInit() {}

    async onTranslate() {
        try {
            const targetLanguage = 'de-DE'; // target language
            console.log('targetLanguage:', targetLanguage);
            // Load the JSON file from assets
            const jsonFile = await this.translationProcessingApiFilesService.getJsonFileData(targetLanguage);
            console.log('getJsonFileData:', jsonFile);
            // Send the JSON file to the backend for translation
            const translated = await this.translationProcessingApiFilesService.sendForTranslation(
                jsonFile,
                targetLanguage,
            );
            console.log('translated:', translated);
            // Assign the translated JSON to a variable
            this.translatedJson = translated;
            console.log('this.translatedJson:', this.translatedJson);
        } catch (error) {
            console.error('Error during translation:', error);
        }
    }
}
