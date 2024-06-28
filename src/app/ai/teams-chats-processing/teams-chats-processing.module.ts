import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsChatsProcessingComponent } from './teams-chats-processing.component';
import { TeamsChatsProcessingService } from './teams-chats-processing.service';

@NgModule({
    imports: [CommonModule],
    declarations: [TeamsChatsProcessingComponent],
    providers: [TeamsChatsProcessingService],
})
export class TeamsChatsProcessingModule {}

