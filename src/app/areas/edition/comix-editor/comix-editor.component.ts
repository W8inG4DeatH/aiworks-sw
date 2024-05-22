import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComixItem } from 'src/app/areas/list/list.interfaces';

@Component({
    selector: 'comix-editor',
    templateUrl: './comix-editor.component.html',
    styleUrls: ['./comix-editor.component.scss'],
})
export class ComixEditorComponent implements OnInit {
    @Input()
    public element: IComixItem = this.PrepareNewElement();

    @Input()
    public id: number | null = null;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.GetIdParameter();
    }

    GetIdParameter() {
        this.activatedRoute.paramMap.subscribe((params) => {
            const idParam = params.get('id');
            const id = idParam !== null ? Number(idParam) : null;

            // Sprawdzenie, czy 'id' jest skończoną liczbą
            if (id !== null && Number.isFinite(id)) {
                this.id = id;
                this.element = this.LoadElement(this.id);
            }
        });
    }

    PrepareNewElement(): IComixItem {
        const newElement: IComixItem = {
            SeriesTitle: '',
            ComixTitle: '',
            Author: '',
            Publisher: '',
            PublishmentYear: '',
            NumberOfPages: 1,
            CoverHard: false,
            Rating: 1,
            Collected: false,
        };
        return newElement;
    }

    LoadElement(id: number): IComixItem {
        const loadedElement: IComixItem = {
            SeriesTitle: 'Minionki',
            ComixTitle: 'Gru to szef',
            Author: 'WB',
            Publisher: 'EGMONT Polska',
            PublishmentYear: '2024',
            NumberOfPages: 100,
            CoverHard: true,
            Rating: 10,
            Collected: false,
        };
        return loadedElement;
    }

    OnSubmitClick() {}
}
