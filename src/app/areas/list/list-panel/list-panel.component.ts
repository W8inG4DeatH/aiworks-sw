import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListDataService } from 'src/app/areas/list/list-data.service';
import * as _ from 'lodash';

@Component({
    selector: 'list-panel',
    templateUrl: './list-panel.component.html',
    styleUrls: ['./list-panel.component.scss'],
})
export class ListPanelComponent implements OnInit {
    public itemsData: Array<any> = [];
    public columnsKeys: Array<string> = [];
    public columnsNames: Array<string> = [];
    public columnsFlex: Array<number> = [];

    constructor(
        private router: Router,
        public ListDataService: ListDataService,
    ) {}

    ngOnInit(): void {
        this.InitColumns();
        this.LoadData();
        this.ConvertData();
        this.ConvertDisplayData();
    }

    InitColumns() {
        this.columnsKeys = ['Id', 'DisplayName', 'Author', 'Collected', 'NumberOfPages', 'CoverHard', 'Rating'];
        this.columnsNames = ['Nr', 'Nazwa', 'Autor', 'Mam', 'Strony', 'Twarda', 'Ocena'];
        this.columnsFlex = [5, 45, 30, 5, 5, 5, 5];
    }

    LoadData() {
        this.itemsData = this.ListDataService.GetComixListData();
    }

    ConvertData() {
        _.forEach(this.itemsData, (item, index) => {
            item.Id = index + 1;

            item.DisplayName = '';
            item.DisplayName += item.SeriesTitle ? item.SeriesTitle : '';
            item.DisplayName += item.SeriesSubtitle ? ' - ' + item.SeriesSubtitle : '';
            item.DisplayName += item.ComixTitle ? (item.SeriesTitle ? ': ' : '') + item.ComixTitle : '';

            item.CoverHard = item.CoverHard !== undefined ? item.CoverHard : false;
            item.Collected = item.Collected !== undefined ? item.Collected : false;
        });
    }

    ConvertDisplayData() {
        _.forEach(this.itemsData, (item) => {
            item.CoverHard = item.CoverHard ? 'TAK' : '';
            item.Rating = item.Rating ? item.Rating + '/10' : '';
            item.Collected = item.Collected ? 'TAK' : '';
        });
    }

    OnColumnHeaderClick(columnKey: string) {
        this.itemsData = _.sortBy(this.itemsData, [columnKey]);
        console.log('OnColumnHeaderClick:', columnKey, this.itemsData);
    }

    OnItemClick(item: any) {
        this.router.navigate(['/edition', item.Id]);
    }
}
