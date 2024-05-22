import { Component, OnInit } from '@angular/core';
import { PostHttpService } from 'src/app/api-services/post-http.service';
import { EventSourcePolyfill } from 'event-source-polyfill';

@Component({
    selector: 'app-widgets-panel',
    templateUrl: './widgets-panel.component.html',
    styleUrls: ['./widgets-panel.component.scss'],
})
export class WidgetsPanelComponent implements OnInit {
    public translatedJson: any;

    public myAIPrompt: string = `
    Chcę templatkę komponentu Angular/TypeScript zmodyfikować zamieniając wszystkie elementy pochodzące z biblioteki angular-flex-layout na elementy z biblioteki Tilewind.
    Nie używaj klas Tilewind jako atrybutów, a tylko jako nazwy klas.
    Uważaj na zduplikowanie class="..." w tym samym elemencie html. Wszystkie klasy dla danego elementu powinny być w jednym class="...".
    Oto główne zasady modyfikacji:
    1) fxFlex="row" lub 'layout-row' zamiana na 'flex-row flex flex-none'. Uwaga: jeśli element z fxFlex="row" posiada równocześnie fxFlex lub 'flex' w klasach, to bez 'flex-none', czyli samo: 'flex-row flex'.
    2) fxFlex="column" lub 'layout-column' zamiana analogicznie jak fxFlex="row".
    3) fxFlex="XX" lub 'flex-XX', gdzie XX oznacza liczbę procentową, zamiana na 'basis-[XX%]', czyli np. fxFlex="70" na 'basis-[70%]'.
    4) Samo fxFlex lub 'flex' (bez fxFlex="row" i bez fxFlex="column", zamiana na 'flex-1' lub odpowiednią klasę basis, np. 'basis-0' lub 'basis-auto', w zależności od kontekstu.
    5) fxFlex="{{ myVar }}" lub 'flex-{{myVar}}', gdzie myVar to dowolna nazwa zmiennej, zamiana na: 'basis-['myVar'%]'.
    6) fxLayoutAlign="start center" lub 'layout-align-start-center' zamiana na 'justify-start items-center' dla 'flex-row'. Dla 'flex-col' justify i items są zamienione wartościami.
    7) fxLayoutFill lub 'layout-fill' zamiana na: 'w-full h-full'.
    8) Przykładowe zamiany:
    a)
    <div class="content-text-container" fxLayout="row" fxLayoutAlign="start center">
    zamiana na:
    <div class="content-text-container flex flex-row flex-none justify-start items-center">
    b)
    <div class="content-text-container" fxLayout="column" fxLayoutAlign="start space-between" fxFlex>
    zamiana na:
    <div class="content-text-container flex flex-col items-start justify-between">

    Zwróć tylko zmodyfikowany kod HTML bez żadnych opisów, wyjaśnień oraz formatowania Markdown html.

    Template:
    `;

    progress: { completed: number; total: number } | null = null;

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
            this.listenToProgress();
            const modifyResponse = await this.postHttpService.sendForAIModificationFiles(
                projectDirectoryPath,
                this.myAIPrompt,
            );
            console.log('modifyResponse:', modifyResponse);
            console.log('Response message:', modifyResponse.message);
        } catch (error) {
            console.error('Error during AI modification:', error);
        }
    }

    listenToProgress() {
        const eventSource = new EventSourcePolyfill('http://localhost:3000/aimodify/progress', {
            headers: {
                Authorization: 'Bearer YOUR_TOKEN',
            },
        });

        eventSource.onmessage = (event) => {
            this.progress = JSON.parse(event.data);
            console.log(`Progress: ${this.progress?.completed}/${this.progress?.total}`);
        };

        eventSource.onerror = (error) => {
            console.error('Error receiving progress:', error);
            eventSource.close();
        };
    }
}
