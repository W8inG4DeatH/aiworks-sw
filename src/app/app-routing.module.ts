import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from 'src/app/areas/dashboard/dashboard.module';
import { WidgetsPanelComponent } from 'src/app/areas/dashboard/widgets-panel/widgets-panel.component';
import { ListPanelComponent } from 'src/app/areas/list/list-panel/list-panel.component';
import { ComixEditorComponent } from 'src/app/areas/edition/comix-editor/comix-editor.component';
import { EditionGuardGuard } from 'src/app/areas/edition/edition-guard.guard';
import { HtmlEditorComponent } from './common-components/html-editor/html-editor.component';

const routes: Routes = [
    { path: '', component: WidgetsPanelComponent },
    { path: 'dashboard', component: WidgetsPanelComponent },
    { path: 'list', component: ListPanelComponent },
    { path: 'edition', component: ComixEditorComponent, canActivate: [EditionGuardGuard] },
    { path: 'edition/:id', component: ComixEditorComponent, canActivate: [EditionGuardGuard] },
    { path: 'html-editor', component: HtmlEditorComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), DashboardModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
