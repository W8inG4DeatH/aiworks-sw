import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComixEditorComponent } from 'src/app/areas/edition/comix-editor/comix-editor.component';

describe('ComixEditorComponent', () => {
    let component: ComixEditorComponent;
    let fixture: ComponentFixture<ComixEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ComixEditorComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ComixEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
