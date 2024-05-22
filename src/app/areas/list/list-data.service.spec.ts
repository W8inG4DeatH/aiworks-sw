import { TestBed } from '@angular/core/testing';

import { ListDataService } from 'src/app/areas/list/list-data.service';

describe('ListDataService', () => {
    let service: ListDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ListDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
