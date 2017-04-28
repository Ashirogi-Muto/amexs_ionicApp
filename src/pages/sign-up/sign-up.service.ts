import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class SignUpService {
    constructor(private http: Http) { }

    callSignUpApi() {
        
    }
}