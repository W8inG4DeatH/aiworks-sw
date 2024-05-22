import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/areas/login/login.service';

@Component({
    selector: 'main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
    constructor(
        private router: Router,
        public LoginService: LoginService,
    ) {}

    ngOnInit(): void {}

    OnLogoClick() {
        this.router.navigate(['/']);
    }
}
