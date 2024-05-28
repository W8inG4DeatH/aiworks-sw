import { Component, OnInit } from '@angular/core';
import { PromptLibraryService } from 'src/app/common-components/prompt-library/prompt-library.service';
import { IAiFile } from 'src/app/common-components/common-components.interfaces';

@Component({
    selector: 'prompt-library',
    templateUrl: './prompt-library.component.html',
    styleUrls: ['./prompt-library.component.scss'],
})
export class PromptLibraryComponent implements OnInit {
    public projectDirectoryPath: string[] = ['c:', 'project', 'aiworks-prompts'];
    files: IAiFile[] = [];
    selectedFile: IAiFile | null = null;

    constructor(private promptLibraryService: PromptLibraryService) {}

    ngOnInit(): void {
        this.loadFiles();
    }

    loadFiles(): void {
        const path = this.projectDirectoryPath.join('/');
        this.promptLibraryService.readAllTxtFiles(path).subscribe((files) => {
            this.files = files;
        });
    }

    updateFile(file: IAiFile): void {
        this.promptLibraryService.updateTxtFile(file).subscribe(() => {
            this.loadFiles();
        });
    }

    deleteFile(file: IAiFile): void {
        this.promptLibraryService.deleteTxtFile(file).subscribe(() => {
            this.loadFiles();
        });
    }

    selectFile(file: IAiFile): void {
        this.selectedFile = file;
    }

    saveSelectedFile(): void {
        if (this.selectedFile) {
            this.updateFile(this.selectedFile);
            this.selectedFile = null;
        }
    }
}
