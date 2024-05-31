import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PromptLibraryService } from 'src/app/common-components/prompt-library/prompt-library.service';
import { IAiFile } from 'src/app/common-components/common-components.interfaces';

@Component({
    selector: 'prompt-library',
    templateUrl: './prompt-library.component.html',
    styleUrls: ['./prompt-library.component.scss'],
})
export class PromptLibraryComponent implements OnInit {
    @Output()
    selectPromptEmitter = new EventEmitter<IAiFile | null>();

    public projectDirectoryPath: string[] = ['c:', 'project', 'aiworks-prompts'];
    files: IAiFile[] = [];
    selectedFile: IAiFile | null = null;
    editMode: boolean = false;

    constructor(private promptLibraryService: PromptLibraryService) {}

    get directoryPath(): string {
        return this.projectDirectoryPath.join('/');
    }

    ngOnInit(): void {
        this.loadFiles();
    }

    loadFiles(): void {
        const path = this.projectDirectoryPath.join('/');
        this.promptLibraryService.readAllTxtFiles(path).subscribe((files) => {
            this.files = files;
        });
    }

    onSelectFile(file: IAiFile): void {
        this.selectedFile = file;
        this.editMode = false;
    }

    updateFile(file: IAiFile): void {
        this.promptLibraryService.updateTxtFile(file).subscribe(() => {
            // this.loadFiles();
        });
    }

    onDeleteSelectedFile(file: IAiFile): void {
        this.promptLibraryService.deleteTxtFile(file).subscribe(() => {
            this.loadFiles();
        });
    }

    onEditFile() {
      this.editMode = true;
    }

    onSaveFile(): void {
        if (this.selectedFile) {
            this.updateFile(this.selectedFile);
            this.editMode = false;
        }
    }

    onUsePrompt(): void {
        this.selectPromptEmitter.emit(this.selectedFile);
    }
}
