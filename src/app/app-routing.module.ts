import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from 'src/app/areas/dashboard/dashboard.module';
import { WidgetsPanelComponent } from 'src/app/areas/dashboard/widgets-panel/widgets-panel.component';
import { AiProcessingApiFilesComponent } from './ai/ai-processing-api-files/ai-processing-api-files.component';
import { TeamsChatsProcessingComponent } from './ai/teams-chats-processing/teams-chats-processing.component';
import { TranslationProcessingApiFilesComponent } from './ai/translation-processing-api-files/translation-processing-api-files.component';
import { WebSecurityTestingComponent } from './security/web-security-testing/web-security-testing.component';

const routes: Routes = [
    { path: '', component: WidgetsPanelComponent },
    { path: 'dashboard', component: WidgetsPanelComponent },
    { path: 'ai-processing-api-files', component: AiProcessingApiFilesComponent },
    { path: 'teams-chats-processing', component: TeamsChatsProcessingComponent },
    { path: 'translation-processing-api-files', component: TranslationProcessingApiFilesComponent },
    { path: 'web-security-testing', component: WebSecurityTestingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), DashboardModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
