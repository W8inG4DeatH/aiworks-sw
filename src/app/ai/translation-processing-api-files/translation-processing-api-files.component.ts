import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationProcessingApiFilesService } from 'src/app/ai/translation-processing-api-files/translation-processing-api-files.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'translation-processing-api-files',
    templateUrl: './translation-processing-api-files.component.html',
    styleUrls: ['./translation-processing-api-files.component.scss'],
})
export class TranslationProcessingApiFilesComponent implements OnInit, OnDestroy {
    public translatedJson: any;
    public progressMessages: string[] = [];
    private progressSubscriptions: Subscription[] = [];

    public projectDirectoryPath: string[] = ['c:', 'sw-api-test', 'translate'];
    public sourceFileName: string = 'source.json';
    public sourceLanguage: string = 'en-US';
    public targetLanguages: string[] = [
        'pl-PL',
        'de-DE',
        'fr-FR',
        'es-ES',
        'pt-PT',
        'it-IT',
        'cs-CZ',
        'sk-SK',
        'uk-UA',
        'zh-CN',
    ];

    constructor(private translationProcessingApiFilesService: TranslationProcessingApiFilesService) {}

    ngOnInit() {}

    async onTranslate() {
        this.progressMessages = [];

        // Unsubscribe from previous subscriptions
        this.progressSubscriptions.forEach((subscription) => subscription.unsubscribe());
        this.progressSubscriptions = [];

        this.targetLanguages.forEach((language) => {
            const subscription = this.translationProcessingApiFilesService
                .getTranslationProgress(language)
                .subscribe((progress) => {
                    if (!this.progressMessages.includes(`File ${progress.status}: ${progress.language}.json`)) {
                        this.progressMessages.push(`File ${progress.status}: ${progress.language}.json`);
                    }
                });
            this.progressSubscriptions.push(subscription);
        });

        this.translationProcessingApiFilesService
            .sendForTranslation(
                this.projectDirectoryPath,
                this.sourceFileName,
                this.sourceLanguage,
                this.targetLanguages,
            )
            .subscribe((result) => {
                console.log('Translation complete', result);
            });
    }

    ngOnDestroy() {
        this.progressSubscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
