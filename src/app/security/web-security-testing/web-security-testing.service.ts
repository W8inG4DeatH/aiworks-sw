import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { BACKEND_URL } from 'src/app/constants';

@Injectable({
    providedIn: 'root',
})
export class WebSecurityTestingService {
    private apiUrl = `${BACKEND_URL}/web-security-testing`;

    // Global variables
    targetUrl: string = 'https://apcs-vm02.media-press.tv/whistleblower_';

    sqlInput: string = "'; DROP TABLE users; --";
    xssInput: string = "<script>alert('XSS');</script>";
    csrfInput: string = 'invalid_csrf_token';
    idorInput: string = 'privateResourceId';
    rceInput: string = '; ls -la;';
    dirTravInput: string = '../../etc/passwd';
    secMisconfInput: string = 'default_password';
    sensitiveDataInput: string = 'password=123456';
    brokenAuthInput: string = '123456';
    accessControlInput: string = 'guestUser';
    corsInput: string = 'https://malicious.com';
    fileUploadInput: string = 'malicious.php';
    bruteForceInput: string = '10';
    dosInput: string = '1000';
    sslTlsInput: string = 'SSLv3';

    tests = [
        { id: 'sql-injection', name: '#1 - SQL Injection (SQLi)', input: this.sqlInput, processing: false },
        { id: 'xss', name: '#2 - Cross-Site Scripting (XSS)', input: this.xssInput, processing: false },
        { id: 'csrf', name: '#3 - Cross-Site Request Forgery (CSRF)', input: this.csrfInput, processing: false },
        { id: 'idor', name: '#4 - Insecure Direct Object References (IDOR)', input: this.idorInput, processing: false },
        { id: 'rce', name: '#5 - Remote Code Execution (RCE)', input: this.rceInput, processing: false },
        { id: 'directory-traversal', name: '#6 - Directory Traversal', input: this.dirTravInput, processing: false },
        { id: 'security-misconfiguration', name: '#7 - Security Misconfiguration', input: this.secMisconfInput, processing: false },
        { id: 'sensitive-data-exposure', name: '#8 - Sensitive Data Exposure', input: this.sensitiveDataInput, processing: false },
        { id: 'broken-authentication', name: '#9 - Broken Authentication and Session Management', input: this.brokenAuthInput, processing: false },
        { id: 'access-control', name: '#10 - Access Control', input: this.accessControlInput, processing: false },
        { id: 'cors', name: '#11 - Cross-Origin Resource Sharing (CORS)', input: this.corsInput, processing: false },
        { id: 'file-upload', name: '#12 - File Upload Vulnerability', input: this.fileUploadInput, processing: false },
        { id: 'brute-force', name: '#13 - Brute Force Attack', input: this.bruteForceInput, processing: false },
        { id: 'dos', name: '#14 - Denial of Service (DoS)', input: this.dosInput, processing: false },
        { id: 'ssl-tls', name: '#15 - HTTPS/SSL/TLS Configuration', input: this.sslTlsInput, processing: false }
    ];

    constructor(private http: HttpClient) {}

    runTest(testName: string, input: string, targetUrl: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/${testName}/main-test`, { input, targetUrl }).pipe(
            catchError((error: HttpErrorResponse) => {
                return of({ error: true, message: error.message });
            }),
        );
    }

    getTestDescription(testName: string): Observable<string> {
        const descriptions: { [key: string]: string } = {
            'sql-injection': `
        <div class="title">#1 - SQL Injection (SQLi)</div>
        <p><b>SQL Injection (SQLi)</b> is an attack that injects malicious SQL code into database queries. If an application does not properly secure input data, an attacker can manipulate SQL queries, which may lead to unauthorized access to data or modifications to the database.</p>
        <br>
        <p>The SQL Injection test checks whether the application properly validates and sanitizes input data before it is used in SQL queries.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No SQL Injection vulnerability detected: Input data is properly sanitized and malicious SQL cannot be injected. This proves that the application properly protects itself against this type of attack.</li>
          <li>Vulnerability (Potential SQL Injection vulnerability detected): Input data is not properly sanitized, allowing malicious SQL injection. This poses a serious threat to the security of the application because the attacker can access, modify or delete data.</li>
        </ul>
      `,
            'xss': `
        <div class="title">#2 - Cross-Site Scripting (XSS)</div>
        <p><b>Cross-Site Scripting (XSS)</b> is an attack that injects malicious scripts into web pages viewed by other users. If an application does not properly sanitize input data, an attacker can inject scripts that are executed in the user's browser, stealing session data or performing other malicious actions.</p>
        <br>
        <p>The XSS test checks whether the application properly validates and sanitizes input data before it is rendered in the browser.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No XSS vulnerability detected: Input data is properly sanitized and no malicious scripts can be injected. This indicates that the application is properly protected against this type of attack.</li>
          <li>Vulnerability (Potential XSS vulnerability detected): Input data is not properly sanitized, allowing malicious script injection. This poses a serious threat to the security of the application as the attacker can inject scripts that execute in the user's browser, stealing session data or performing other malicious actions.</li>
        </ul>
      `,
            'csrf': `
        <div class="title">#3 - Cross-Site Request Forgery (CSRF)</div>
        <p><b>Cross-Site Request Forgery (CSRF)</b> is an attack where a malicious website tricks a user's browser into performing actions on another site to which the user is authenticated. If an application does not verify the authenticity of requests, an attacker can perform actions on behalf of the user without their consent.</p>
        <br>
        <p>The CSRF test checks whether the application properly verifies the authenticity of requests, such as through CSRF tokens.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No CSRF vulnerability detected: Requests are properly verified and cannot be forged. This indicates that the application is protected against CSRF attacks.</li>
          <li>Vulnerability (Potential CSRF vulnerability detected): Requests are not properly verified, allowing request forgery. This poses a serious threat to the application as attackers can perform actions on behalf of authenticated users.</li>
        </ul>
      `,
            'idor': `
        <div class="title">#4 - Insecure Direct Object References (IDOR)</div>
        <p><b>Insecure Direct Object References (IDOR)</b> occur when an application provides direct access to objects based on user-supplied input. If access controls are not properly implemented, an attacker can manipulate the input to access unauthorized data.</p>
        <br>
        <p>The IDOR test checks whether access to resources is properly controlled and whether input parameters are validated.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No IDOR vulnerability detected: Access to resources is properly controlled and input parameters are validated. This indicates that the application is protected against IDOR attacks.</li>
          <li>Vulnerability (Potential IDOR vulnerability detected): Access to resources is not properly controlled, allowing unauthorized data access. This poses a serious threat to the application's data security.</li>
        </ul>
      `,
            'rce': `
        <div class="title">#5 - Remote Code Execution (RCE)</div>
        <p><b>Remote Code Execution (RCE)</b> is an attack where an attacker executes malicious code on a server. If an application does not properly sanitize input data, an attacker can inject code that is executed on the server.</p>
        <br>
        <p>The RCE test checks whether input data is properly sanitized and whether the application protects against code injection.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No RCE vulnerability detected: Input data is properly sanitized and no code can be injected. This indicates that the application is protected against RCE attacks.</li>
          <li>Vulnerability (Potential RCE vulnerability detected): Input data is not properly sanitized, allowing code injection. This poses a serious threat to the application's server security.</li>
        </ul>
      `,
            'directory-traversal': `
        <div class="title">#6 - Directory Traversal</div>
        <p><b>Directory Traversal</b> is an attack that allows attackers to access files and directories that are outside the intended directory. If an application does not properly control file paths, an attacker can manipulate the path to access unauthorized files.</p>
        <br>
        <p>The Directory Traversal test checks whether the application properly controls file paths.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No Directory Traversal vulnerability detected: File paths are properly controlled and no unauthorized files can be accessed. This indicates that the application is protected against directory traversal attacks.</li>
          <li>Vulnerability (Potential Directory Traversal vulnerability detected): File paths are not properly controlled, allowing unauthorized file access. This poses a serious threat to the application's file security.</li>
        </ul>
      `,
            'security-misconfiguration': `
        <div class="title">#7 - Security Misconfiguration</div>
        <p><b>Security Misconfiguration</b> occurs when security settings are not defined or are implemented incorrectly. This can lead to various vulnerabilities.</p>
        <br>
        <p>The Security Misconfiguration test checks whether the server, database, and application are properly configured.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No Security Misconfiguration detected: The server, database, and application are properly configured. This indicates that the application is protected against security misconfigurations.</li>
          <li>Vulnerability (Potential Security Misconfiguration detected): The server, database, or application are not properly configured, leading to potential vulnerabilities. This poses a serious threat to the application's security.</li>
        </ul>
      `,
            'sensitive-data-exposure': `
        <div class="title">#8 - Sensitive Data Exposure</div>
        <p><b>Sensitive Data Exposure</b> occurs when an application does not adequately protect sensitive information, such as personal data, passwords, or API keys. If data is not properly encrypted, it can be exposed to attackers.</p>
        <br>
        <p>The Sensitive Data Exposure test checks whether sensitive data is properly encrypted and whether sensitive information is disclosed in server responses.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No Sensitive Data Exposure detected: Sensitive data is properly encrypted and not disclosed. This indicates that the application is protected against sensitive data exposure.</li>
          <li>Vulnerability (Potential Sensitive Data Exposure detected): Sensitive data is not properly encrypted or is disclosed in server responses. This poses a serious threat to the application's data security.</li>
        </ul>
      `,
            'broken-authentication': `
        <div class="title">#9 - Broken Authentication and Session Management</div>
        <p><b>Broken Authentication and Session Management</b> occur when authentication and session management mechanisms are implemented incorrectly. This can lead to various attacks, such as session hijacking.</p>
        <br>
        <p>The Broken Authentication test checks whether passwords are securely stored and transmitted, and whether sessions are properly managed.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No Broken Authentication detected: Passwords are securely stored and transmitted, and sessions are properly managed. This indicates that the application is protected against broken authentication and session management issues.</li>
          <li>Vulnerability (Potential Broken Authentication detected): Passwords are not securely stored or transmitted, or sessions are not properly managed. This poses a serious threat to the application's authentication and session security.</li>
        </ul>
      `,
            'access-control': `
        <div class="title">#10 - Access Control</div>
        <p><b>Access Control</b> checks whether an application properly controls user access to resources. If access controls are not properly implemented, users can access resources they should not have access to.</p>
        <br>
        <p>The Access Control test checks whether access policies and user permissions are properly enforced.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No Access Control issues detected: Access policies and user permissions are properly enforced. This indicates that the application is protected against access control issues.</li>
          <li>Vulnerability (Potential Access Control issue detected): Access policies and user permissions are not properly enforced, allowing unauthorized access to resources. This poses a serious threat to the application's security.</li>
        </ul>
      `,
            'cors': `
        <div class="title">#11 - Cross-Origin Resource Sharing (CORS)</div>
        <p><b>Cross-Origin Resource Sharing (CORS)</b> is a mechanism that allows resources on a web page to be requested from another domain outside the domain from which the resource originated. If CORS policies are not properly configured, it can lead to unauthorized cross-origin requests.</p>
        <br>
        <p>The CORS test checks whether CORS headers and policies are properly configured.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No CORS issues detected: CORS headers and policies are properly configured. This indicates that the application is protected against CORS issues.</li>
          <li>Vulnerability (Potential CORS issue detected): CORS headers and policies are not properly configured, allowing unauthorized cross-origin requests. This poses a serious threat to the application's security.</li>
        </ul>
      `,
            'file-upload': `
        <div class="title">#12 - File Upload Vulnerability</div>
        <p><b>File Upload Vulnerability</b> occurs when an application improperly handles file uploads, potentially allowing malicious files to be uploaded.</p>
        <br>
        <p>The File Upload test checks whether file uploads are properly validated and sanitized.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No File Upload vulnerability detected: File uploads are properly validated and sanitized. This indicates that the application is protected against file upload vulnerabilities.</li>
          <li>Vulnerability (Potential File Upload vulnerability detected): File uploads are not properly validated or sanitized, allowing malicious files to be uploaded. This poses a serious threat to the application's security.</li>
        </ul>
      `,
            'brute-force': `
        <div class="title">#13 - Brute Force Attack</div>
        <p><b>Brute Force Attack</b> occurs when an attacker attempts to guess passwords by trying many possible combinations. If an application does not protect against brute force attacks, it can lead to unauthorized access.</p>
        <br>
        <p>The Brute Force test checks whether mechanisms such as account lockout or rate limiting are in place to prevent brute force attacks.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No Brute Force vulnerability detected: Mechanisms are in place to prevent brute force attacks. This indicates that the application is protected against brute force attacks.</li>
          <li>Vulnerability (Potential Brute Force vulnerability detected): Mechanisms to prevent brute force attacks are not in place, allowing attackers to guess passwords. This poses a serious threat to the application's authentication security.</li>
        </ul>
      `,
            'dos': `
        <div class="title">#14 - Denial of Service (DoS)</div>
        <p><b>Denial of Service (DoS)</b> occurs when an attacker overwhelms a server with requests, causing it to become unavailable to legitimate users. If an application does not protect against DoS attacks, it can be taken offline by an attacker.</p>
        <br>
        <p>The DoS test checks whether mechanisms such as rate limiting and resource management are in place to prevent DoS attacks.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No DoS vulnerability detected: Mechanisms are in place to prevent DoS attacks. This indicates that the application is protected against DoS attacks.</li>
          <li>Vulnerability (Potential DoS vulnerability detected): Mechanisms to prevent DoS attacks are not in place, allowing the server to be overwhelmed. This poses a serious threat to the application's availability.</li>
        </ul>
      `,
            'ssl-tls': `
        <div class="title">#15 - HTTPS/SSL/TLS Configuration</div>
        <p><b>HTTPS/SSL/TLS Configuration</b> checks whether an application uses secure protocols for communication and whether the SSL/TLS configuration is correct.</p>
        <br>
        <p>The SSL/TLS Configuration test checks whether connections are encrypted, certificates are valid, and security headers are correctly set.</p>
        <br>
        <p><strong>Possible results:</strong></p>
        <ul>
          <li>No HTTPS/SSL/TLS vulnerability detected: Connections are encrypted, certificates are valid, and security headers are correctly set. This indicates that the application is protected against HTTPS/SSL/TLS vulnerabilities.</li>
          <li>Vulnerability (Potential HTTPS/SSL/TLS vulnerability detected): Connections are not encrypted, certificates are invalid, or security headers are incorrectly set. This poses a serious threat to the application's communication security.</li>
        </ul>
      `,
        };
        return of(descriptions[testName]);
    }
}

