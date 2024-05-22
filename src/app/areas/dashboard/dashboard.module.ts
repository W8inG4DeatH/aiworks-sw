import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsPanelComponent } from 'src/app/areas/dashboard/widgets-panel/widgets-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { PostHttpService } from 'src/app/api-services/post-http.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    WidgetsPanelComponent
  ],
  providers: [
    PostHttpService
  ]
})
export class DashboardModule { }
