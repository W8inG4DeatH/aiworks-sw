import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuComponent } from 'src/app/areas/main-menu/main-menu.component';

describe('MainMenuComponent', () => {
    let component: MainMenuComponent;
    let fixture: ComponentFixture<MainMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MainMenuComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MainMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
