import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebSecurityTestingComponent } from './web-security-testing.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [WebSecurityTestingComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  exports: [WebSecurityTestingComponent]
})
export class WebSecurityTestingModule {}
