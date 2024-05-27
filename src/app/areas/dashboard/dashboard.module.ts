import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { WidgetsPanelComponent } from 'src/app/areas/dashboard/widgets-panel/widgets-panel.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule],
    declarations: [WidgetsPanelComponent],
})
export class DashboardModule {}
