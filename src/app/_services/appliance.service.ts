import { AlertService } from './alert.service';
import { ApplianceInterface } from '../_interfaces/index';
import { environment } from '../../environments/environment';
import { Http,  Response } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class ApplianceService {
    apiFragment = 'appliances';
    data: any;
    error: any;
    constructor(
        private alertService: AlertService,
        private http: Http,
        private router: Router,
        private userService: UserService,
    ) { }

    postData(data: ApplianceInterface) {
        // Post Data to the API endpoint to create
        return this.http.post(
            environment.API_ENDPOINT + this.apiFragment,
            data,
            this.userService.jwt()
        ).map(res => res.json());
    }

    putData(data: ApplianceInterface) {
        // Put Data to the API endpoint to update
        return this.http.put(
            environment.API_ENDPOINT + this.apiFragment + '/' + data.id,
            data,
            this.userService.jwt()
        ).map(res => res.json());
    }

    get(id: number) {
        // Return a single appliance that has the given id.
        return this.http.get(
            environment.API_ENDPOINT + this.apiFragment + '/' + id,
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }

}
