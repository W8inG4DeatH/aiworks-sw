import { TestBed } from '@angular/core/testing';

import { EditionGuardGuard } from 'src/app/areas/edition/edition-guard.guard';

describe('EditionGuardGuard', () => {
    let guard: EditionGuardGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(EditionGuardGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
