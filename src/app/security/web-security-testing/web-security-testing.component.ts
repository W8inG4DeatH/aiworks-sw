import { Component } from '@angular/core';
import { WebSecurityTestingService } from './web-security-testing.service';

@Component({
    selector: 'app-web-security-testing',
    templateUrl: './web-security-testing.component.html',
    styleUrls: ['./web-security-testing.component.scss'],
})
export class WebSecurityTestingComponent {
    infoPanel: string = '';
    activeTestId: string = '';
    testAllProcessing: boolean = false;

    constructor(public webSecurityTestingService: WebSecurityTestingService) {}

    runTest(testId: string, input: string) {
        const test = this.webSecurityTestingService.tests.find((t) => t.id === testId);
        if (test) {
            test.processing = true;
            this.webSecurityTestingService
                .runTest(testId, input, this.webSecurityTestingService.targetUrl)
                .subscribe((response) => {
                    if (response.error) {
                        if (response.errorType === 'server') {
                            this.infoPanel = `Server Error: ${response.message}. This indicates a problem with the testing server.`;
                        } else {
                            this.infoPanel = `Error: ${response.message}. The application at ${this.webSecurityTestingService.targetUrl} seems to be secure against ${testId} attacks.`;
                        }
                    } else {
                        this.infoPanel = `
                        <p><strong>Test:</strong> ${testId}</p>
                        <p><strong>Target URL:</strong> ${this.webSecurityTestingService.targetUrl}</p>
                        <p><strong>Test Input:</strong> ${input}</p>
                        <p><strong>Result:</strong> ${response.result}</p>
                        <p><strong>Message:</strong> ${response.message}</p>
                    `;
                    }
                    test.processing = false;
                });
        }
    }

    loadTestDescription(testId: string) {
        this.webSecurityTestingService.getTestDescription(testId).subscribe((description) => {
            this.infoPanel = description;
        });
        this.moveTestToTop(testId);
    }

    moveTestToTop(testId: string) {
        const index = this.webSecurityTestingService.tests.findIndex((t) => t.id === testId);
        if (index > -1) {
            const [test] = this.webSecurityTestingService.tests.splice(index, 1);
            this.webSecurityTestingService.tests.unshift(test);
            this.activeTestId = testId;
        }
    }

    runTestAll() {
        this.testAllProcessing = true;
        let results = '';

        const testPromises = this.webSecurityTestingService.tests.map((test) =>
            this.webSecurityTestingService
                .runTest(test.id, test.input, this.webSecurityTestingService.targetUrl)
                .toPromise(),
        );

        Promise.all(testPromises).then((responses) => {
            responses.forEach((response, index) => {
                const test = this.webSecurityTestingService.tests[index];
                if (response.error) {
                    results += `<p><strong>Test:</strong> ${test.name}<br>
                                <strong>Target URL:</strong> ${this.webSecurityTestingService.targetUrl}<br>
                                <strong>Test Input:</strong> ${test.input}<br>
                                <strong>Result:</strong> Error<br>
                                <strong>Message:</strong> ${response.message}</p>
                                <p>The application at ${this.webSecurityTestingService.targetUrl} seems to be secure against ${test.id} attacks.</p><hr>`;
                } else {
                    results += `<p><strong>Test:</strong> ${test.name}<br>
                                <strong>Target URL:</strong> ${this.webSecurityTestingService.targetUrl}<br>
                                <strong>Test Input:</strong> ${test.input}<br>
                                <strong>Result:</strong> ${response.result}<br>
                                <strong>Message:</strong> ${response.message}</p>
                                <p>The application at ${this.webSecurityTestingService.targetUrl} seems to be secure against ${test.id} attacks.</p><hr>`;
                }
            });
            this.infoPanel = results;
            this.testAllProcessing = false;
        });
    }
}

