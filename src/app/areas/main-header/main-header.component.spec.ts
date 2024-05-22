import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderComponent } from 'src/app/areas/main-header/main-header.component';

describe('MainHeaderComponent', () => {
    let component: MainHeaderComponent;
    let fixture: ComponentFixture<MainHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MainHeaderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MainHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
