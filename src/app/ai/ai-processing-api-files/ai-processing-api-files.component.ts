import { Component, OnInit } from '@angular/core';
import { AiProcessingApiFilesService } from './ai-processing-api-files.service';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { IAiFile } from 'src/app/common-components/file-chooser/file-chooser.interfaces';
import { cloneDeep } from 'lodash';

@Component({
    selector: 'ai-processing-api-files',
    templateUrl: './ai-processing-api-files.component.html',
    styleUrls: ['./ai-processing-api-files.component.scss'],
})
export class AiProcessingApiFilesComponent implements OnInit {
    public myAIPrompt: string = `Chcę templatkę komponentu Angular/TypeScript zmodyfikować zamieniając wszystkie elementy pochodzące z biblioteki angular-flex-layout na elementy z biblioteki Tilewind.
    Nie używaj klas Tilewind jako atrybutów, a tylko jako nazwy klas.
    Uważaj na zduplikowanie class="..." w tym samym elemencie html. Wszystkie klasy dla danego elementu powinny być w jednym class="...".
    Oto główne zasady modyfikacji:
    1) fxFlex="row" lub 'layout-row' zamiana na 'flex-row flex flex-none'.
    Uwaga bardzo ważne: jeśli element z fxFlex="row" posiada równocześnie jeszcze dodatkowo fxFlex lub 'flex' w klasach, to zamiana bez 'flex-none', czyli na klasy: 'flex-row flex'.
    2) fxFlex="column" lub 'layout-col' zamiana na 'flex-col flex flex-none'.
    Uwaga bardzo ważne: jeśli element z fxFlex="column" posiada równocześnie jeszcze dodatkowo fxFlex lub 'flex' w klasach, to zamiana bez 'flex-none', czyli na klasy: 'flex-col flex'.
    3) fxFlex="XX" lub 'flex-XX', gdzie XX oznacza liczbę procentową, zamiana na 'basis-[XX%]', czyli np. fxFlex="70" na 'basis-[70%]'.
    4) Samo fxFlex lub 'flex' (bez fxFlex="row" i bez fxFlex="column", zamiana na 'flex-1' lub odpowiednią klasę basis, np. 'basis-0' lub 'basis-auto', w zależności od kontekstu.
    5) fxFlex="{{ myVar }}" lub 'flex-{{myVar}}', gdzie myVar to dowolna nazwa zmiennej, zamiana na: 'basis-['myVar'%]'.
    6) fxLayoutAlign="start center" lub 'layout-align-start-center' zamiana na 'justify-start items-center' dla 'flex-row'. Dla 'flex-col' justify i items są zamienione wartościami.
    7) fxLayoutFill lub 'layout-fill' zamiana na: 'w-full h-full'.
    8) Przykłady zmian:
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

    files: IAiFile[] = [];
    progress: { completed: number; total: number } | null = null;
    processing: boolean = false;

    constructor(private aiProcessingApiFilesService: AiProcessingApiFilesService) {}

    ngOnInit() {}

    async onAIModificationFiles() {
        this.processing = true;
        try {
            this.listenToProgress();
            for (let file of this.files) {
                file.Processed = true;
            }
            const modifyResponse = await this.aiProcessingApiFilesService
                .sendForAIModificationFiles(this.files, this.myAIPrompt)
                .toPromise();
            console.log('modifyResponse:', modifyResponse);
            console.log('Response message:', modifyResponse.message);
        } catch (error) {
            console.error('Error during AI modification:', error);
        } finally {
            this.processing = false;
        }
    }

    listenToProgress() {
        const eventSource = new EventSourcePolyfill('http://localhost:3000/aimodify/progress', {
            heartbeatTimeout: 300000, // Set the timeout to 5 minutes
        });

        eventSource.onmessage = (event) => {
            this.progress = JSON.parse(event.data);
            console.log(`Progress: ${this.progress?.completed}/${this.progress?.total}`);
            this.updateFileProgress(this.progress?.completed || 0, this.progress?.total || 0);
        };

        eventSource.onerror = (error) => {
            console.error('Error receiving progress:', error);
            eventSource.close();
        };
    }

    updateFileProgress(completed: number, total: number) {
        this.files.forEach((file, index) => {
            if (index < completed) {
                file.Processed = false;
                file.Done = true;
            } else if (index < total) {
                file.Processed = true;
                file.Done = false;
            } else {
                file.Processed = false;
                file.Done = false;
            }
        });
    }

    selectFiles(filesData: IAiFile[]): void {
        this.files = cloneDeep(filesData);
    }
}
