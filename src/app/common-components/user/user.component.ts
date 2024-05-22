import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/areas/areas.interfaces';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    @Input()
    user: IUser = <IUser>{};

    @Input()
    layoutInvert: boolean = false;

    constructor() {}

    ngOnInit(): void {
        // console.log('User init:', this.user, this.layoutInvert);
    }
}
