import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { ComixEditorComponent } from 'src/app/areas/edition/comix-editor/comix-editor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ComixEditorComponent],
    imports: [CommonModule, FlexLayoutModule, FormsModule],
})
export class EditionModule {}
