import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelComponent } from 'src/app/areas/list/list-panel/list-panel.component';

describe('ListPanelComponent', () => {
    let component: ListPanelComponent;
    let fixture: ComponentFixture<ListPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListPanelComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
