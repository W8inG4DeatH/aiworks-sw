import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AiProcessingApiFilesModule } from './ai-processing-api-files/ai-processing-api-files.module';
import { TranslationProcessingApiFilesModule } from './translation-processing-api-files/translation-processing-api-files.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule, AiProcessingApiFilesModule, TranslationProcessingApiFilesModule],
})
export class AiModule {}
