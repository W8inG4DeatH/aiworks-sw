import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AiProcessingApiFilesComponent } from './ai-processing-api-files.component';
import { AiProcessingApiFilesService } from './ai-processing-api-files.service';

@NgModule({
    imports: [CommonModule, FormsModule, FlexLayoutModule],
    declarations: [AiProcessingApiFilesComponent],
    providers: [AiProcessingApiFilesService],
})
export class AiProcessingApiFilesModule {}
