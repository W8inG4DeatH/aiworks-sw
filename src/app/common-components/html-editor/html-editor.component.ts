import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-html-editor',
    templateUrl: './html-editor.component.html',
    styleUrls: ['./html-editor.component.css'],
})
export class HtmlEditorComponent implements OnInit {
    public htmlContent: string = '';

    constructor() {}

    ngOnInit(): void {}

    OnModeChange() {
        console.log('OnModeChange()');
    }
}
