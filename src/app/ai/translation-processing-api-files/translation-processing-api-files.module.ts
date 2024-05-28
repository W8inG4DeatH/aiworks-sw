import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TranslationProcessingApiFilesComponent } from 'src/app/ai/translation-processing-api-files/translation-processing-api-files.component';
import { TranslationProcessingApiFilesService } from 'src/app/ai/translation-processing-api-files/translation-processing-api-files.service';

@NgModule({
    imports: [CommonModule, FormsModule, FlexLayoutModule],
    declarations: [TranslationProcessingApiFilesComponent],
    providers: [TranslationProcessingApiFilesService],
})
export class TranslationProcessingApiFilesModule {}
