/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HtmlEditorComponent } from './html-editor.component';

describe('HtmlEditorComponent', () => {
    let component: HtmlEditorComponent;
    let fixture: ComponentFixture<HtmlEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HtmlEditorComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HtmlEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
