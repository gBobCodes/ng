import { AlertService } from './alert.service';
import { ProfileInterface } from '../_interfaces/index';
import { environment } from '../../environments/environment';
import { Http,  Response } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { ClientService } from './client.service';
import { UserService } from './user.service';


@Injectable()
export class ProfileService {
    
    // Supporting Variables
    apiFragment = 'profile';
    data: any;
    error: any;

    constructor(
        private alertService: AlertService,
        private clientService: ClientService,
        private http: Http,
        private router: Router,
        private userService: UserService,
    ) { }

    put(data: ProfileInterface) {
        // Put Data to the API endpoint. Update profile in the database.
        return this.http.put(
            environment.API_ENDPOINT + this.apiFragment + '/' + data.id,
            data,
            this.userService.jwt()
        ).map(res => res.json());
    }

    get(id: number) {
        // Return a single Profile by calling GET
        return this.http.get(
            environment.API_ENDPOINT + this.apiFragment + id,
            this.userService.jwt()
        ).map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(
                error.json().error || 'Server error')
            );
    }

    refreshCurrent() {
        // Refresh the profile of the current user
        this.http.get(
            environment.API_ENDPOINT + this.apiFragment + '/' + this.userService.currentUser.profile.id,
            this.userService.jwt()
        ).map(
            (res:Response) => res.json()
        ).catch(
            (error:any) => Observable.throw(
                error.json().error || 'Server error'
            )
        ).subscribe(data => {
            // No observable being updated as we're using client service
            // Set retrieved values into local storage then refresh
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.profile = data;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            // Refresh the subscribed list around the system
            this.clientService.refreshSubscribed(); 
            }
        )
    }
}
