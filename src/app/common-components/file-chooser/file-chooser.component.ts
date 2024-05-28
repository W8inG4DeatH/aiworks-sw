import { Component, Output, EventEmitter } from '@angular/core';
import { FileChooserService } from './file-chooser.service';
import { IAiFile } from './file-chooser.interfaces';

@Component({
    selector: 'file-chooser',
    templateUrl: './file-chooser.component.html',
    styleUrls: ['./file-chooser.component.scss'],
})
export class FileChooserComponent {
    @Output()
    selectFilesEmitter = new EventEmitter<IAiFile[]>();

    files: IAiFile[] = [];

    public projectDirectoryPath: string[] = ['c:', 'sw-api-test', 'src'];
    public fileExtension: string = 'html';
    public fileFilterStrings: string = 'fxLayout, flex-layout';

    constructor(private fileChooserService: FileChooserService) {}

    get directoryPath(): string {
        return this.projectDirectoryPath.join('/');
    }

    searchFiles() {
        const path = this.directoryPath;
        const filters = this.fileFilterStrings.split(',').map((filter) => filter.trim());

        this.fileChooserService.searchFiles(path, this.fileExtension, filters).subscribe((files) => {
            this.files = files;
        });
    }

    getSelectedFiles() {
        return this.files.filter((file) => file.Selected);
    }

    selectFiles() {
        this.selectFilesEmitter.emit(this.getSelectedFiles());
    }
}
