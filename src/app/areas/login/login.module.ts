import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoAccessComponent } from 'src/app/areas/login/no-access/no-access.component';
import { LoginService } from 'src/app/areas/login/login.service';

@NgModule({
    declarations: [NoAccessComponent],
    imports: [CommonModule],
    providers: [LoginService],
})
export class LoginModule {}
