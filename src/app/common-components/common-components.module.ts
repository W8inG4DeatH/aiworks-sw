import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FileChooserComponent } from 'src/app/common-components/file-chooser/file-chooser.component';
import { UserComponent } from 'src/app/common-components/user/user.component';
import { HtmlEditorComponent } from 'src/app/common-components/html-editor/html-editor.component';
import { PromptLibraryComponent } from 'src/app/common-components/prompt-library/prompt-library.component';

import { FileChooserService } from 'src/app/common-components/file-chooser/file-chooser.service';
import { PromptLibraryService } from 'src/app/common-components/prompt-library/prompt-library.service';

import { TextareaAutoheightDirective } from 'src/app/directives/textarea-autoheight.directive';

@NgModule({
    imports: [CommonModule, FormsModule, FlexLayoutModule],
    declarations: [
        FileChooserComponent,
        UserComponent,
        HtmlEditorComponent,
        PromptLibraryComponent,
        TextareaAutoheightDirective,
    ],
    exports: [
        FileChooserComponent,
        UserComponent,
        HtmlEditorComponent,
        PromptLibraryComponent,
        TextareaAutoheightDirective,
    ],
    providers: [FileChooserService, PromptLibraryService],
})
export class CommonComponentsModule {}
