import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CommonComponentsModule } from 'src/app/common-components/common-components.module';

import { AiProcessingApiFilesComponent } from 'src/app/ai/ai-processing-api-files/ai-processing-api-files.component';
import { AiProcessingApiFilesService } from 'src/app/ai/ai-processing-api-files/ai-processing-api-files.service';

@NgModule({
    imports: [CommonModule, FormsModule, FlexLayoutModule, CommonComponentsModule],
    declarations: [AiProcessingApiFilesComponent],
    providers: [AiProcessingApiFilesService],
})
export class AiProcessingApiFilesModule {}
