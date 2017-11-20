import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserService } from './user.service';

@Injectable()
export class StateService {
    constructor(
        private http: Http,
        private userService: UserService,
    ) { }

    getRuleStates() {
        // Get the rule states from the states API
        return this.http.get(
            environment.API_ENDPOINT + 'states/rule',
            this.userService.jwt()
        ).map((response: Response) => response.json())
    }
}
