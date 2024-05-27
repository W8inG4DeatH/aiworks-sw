import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FileChooserComponent } from './file-chooser/file-chooser.component';
import { UserComponent } from 'src/app/common-components/user/user.component';
import { HtmlEditorComponent } from './html-editor/html-editor.component';

import { FileChooserService } from './file-chooser/file-chooser.service';

@NgModule({
    imports: [CommonModule, FormsModule, FlexLayoutModule],
    declarations: [FileChooserComponent, UserComponent, HtmlEditorComponent],
    exports: [FileChooserComponent, UserComponent, HtmlEditorComponent],
    providers: [FileChooserService],
})
export class CommonComponentsModule {}
