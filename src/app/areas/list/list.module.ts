import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { ListPanelComponent } from 'src/app/areas/list/list-panel/list-panel.component';
import { ListDataService } from 'src/app/areas/list/list-data.service';

@NgModule({
    declarations: [ListPanelComponent],
    imports: [FlexLayoutModule, CommonModule],
    providers: [ListDataService],
})
export class ListModule {}
