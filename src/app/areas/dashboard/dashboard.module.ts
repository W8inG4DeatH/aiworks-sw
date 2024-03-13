import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsPanelComponent } from 'src/app/areas/dashboard/widgets-panel/widgets-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService } from './widgets-panel/translate.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    WidgetsPanelComponent
  ],
  providers: [
    TranslateService
  ]
})
export class DashboardModule { }
