import { Component, OnInit } from '@angular/core';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { cloneDeep } from 'lodash';
import { AiProcessingApiFilesService } from 'src/app/ai/ai-processing-api-files/ai-processing-api-files.service';
import { IAiFile } from 'src/app/common-components/common-components.interfaces';
import { BACKEND_URL } from 'src/app/constants';

@Component({
    selector: 'ai-processing-api-files',
    templateUrl: './ai-processing-api-files.component.html',
    styleUrls: ['./ai-processing-api-files.component.scss'],
})
export class AiProcessingApiFilesComponent implements OnInit {
    myAIPrompt: string = '';
    files: IAiFile[] = [];
    progress: { completed: number; total: number } | null = null;
    processing: boolean = false;

    constructor(private aiProcessingApiFilesService: AiProcessingApiFilesService) {}

    ngOnInit() {}

    async onAIModificationFiles() {
        if (this.canModifyFilesWithAi()) {
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
    }

    listenToProgress() {
        const eventSource = new EventSourcePolyfill(`${BACKEND_URL}/aimodify/progress`, {
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

    selectPrompt(prompt: IAiFile | null): void {
        this.myAIPrompt = prompt?.Content ?? '';
    }

    selectFiles(filesData: IAiFile[]): void {
        this.files = cloneDeep(filesData);
    }

    canModifyFilesWithAi(): boolean {
        return this.myAIPrompt?.length > 0 && this.files?.length > 0;
    }
}
