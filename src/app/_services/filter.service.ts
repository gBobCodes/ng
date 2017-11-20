import { FilterInterface } from '../_interfaces/index';
import { environment } from '../../environments/environment';
import { URLSearchParams, RequestOptions } from '@angular/http';
import { Http,  Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';


@Injectable()
export class FilterService {

    // to hold observable client data
    filterResults = new BehaviorSubject(undefined);
    filterParams = new BehaviorSubject(undefined);

    constructor(
        private http: Http,
        private userService: UserService,
    ) { }

    // OBSERVABLES
    results() {
        // acts as observable variable for filter data
        return this.filterResults.asObservable();
    }

    params() {
        // acts as observable variable for filter data
        return this.filterParams.asObservable();
    }

    getData(FormData: FilterInterface) {
        // Get data from the search API

        // Clear out current results before we populate data.
        this.filterResults.next(null);
        let params = new URLSearchParams();
        for (let key in FormData) {
            let value = FormData[key];
            if (key === 'created_date_start' || key === 'created_date_end') {
                value = new Date(value).toISOString()
            }
            params.set(key, value);
            this.filterParams.next(params);
        }

        let options = new RequestOptions({
            headers: this.userService.jwtHeaderOnly(),
            params: params
        });

        this.http.get(
            environment.API_ENDPOINT + 'content/', options
        ).map(
            (response: Response) => response.json()
        ).subscribe(data => {
            this.filterResults.next(data);
        });;
    }
}
