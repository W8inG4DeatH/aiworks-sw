import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WebSecurityTestingModule } from 'src/app/security/web-security-testing/web-security-testing.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule, WebSecurityTestingModule],
})
export class SecurityModule {}
