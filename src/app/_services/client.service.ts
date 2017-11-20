import { Http,  Response } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'
import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { ClientInterface } from '../_interfaces/index';
import { environment } from '../../environments/environment';


@Injectable()
export class ClientService {
    
    // Supporting Variables
    apiFragment = 'clients';
    data: any;
    error: any;

    // to hold observable client data 
    clientsAll = new BehaviorSubject(undefined);
    clientsAvailable = new BehaviorSubject(undefined);
    clientsSubscribed = new BehaviorSubject(undefined);

    constructor(
        private alertService: AlertService,
        private http: Http,
        private router: Router,
        private userService: UserService,
    ) { }


    postData(data: ClientInterface) {
        // Post Data to the API endpoint
        return this.http.post(
            environment.API_ENDPOINT + this.apiFragment,
            data,
            this.userService.jwt()
        ).map(res => res.json());
    }

    putData(data: ClientInterface) {
        // Put Data to the API endpoint
        return this.http.put(
            environment.API_ENDPOINT + this.apiFragment + '/' + data.id,
            data,
            this.userService.jwt()
        ).map(res => res.json());
    }

    // OBSERVABLES
    all() {
        // acts as observable variable for all clients to be viewed from anywhere
        return this.clientsAll.asObservable();
    }

    available() {
        // acts as observable variable for all clients to be viewed from anywhere
        return this.clientsAvailable.asObservable();
    }

    subscribed() {
        // acts as observable variable for currentuser subscribed clients
        return this.clientsSubscribed.asObservable();
    }

    refreshAll() {
        // method to refresh all clients observable
        this.http.get(
            environment.API_ENDPOINT + this.apiFragment,
            this.userService.jwt()
        ).map(
            (response: Response) => response.json()
        ).subscribe(data => {
            this.clientsAll.next(data);
        });
    }

    refreshAvailable() {
        // method to refresh all clients observable
        this.http.get(
            environment.API_ENDPOINT + this.apiFragment + '/available',
            this.userService.jwt()
        ).map(
            (response: Response) => response.json()
        ).subscribe(data => {
            this.clientsAvailable.next(data);
        });
    }

    refreshSubscribed() {
        // method to refresh user subscribed clients observable
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let subscribed = currentUser.profile.clients;
        this.clientsSubscribed.next(subscribed);
    }

    get(id: number) {
        // Return a single client that has the given id.
        return this.http.get(
            environment.API_ENDPOINT + this.apiFragment + '/' + id,
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    getAppliances(id: number) {
        // Return all appliances for a single client that has the given id.
        return this.http.get(
            environment.API_ENDPOINT + this.apiFragment + '/' + id + '/appliances',
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    getAvailable() {
        // Return a list of available clients for the current user.
        return this.http.get(
            environment.API_ENDPOINT + this.apiFragment + '/available',
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }
    
    getDisabled() {
        // Return a list of disabled clients.
        return this.http.get(
            environment.API_ENDPOINT + this.apiFragment + '/disabled',
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    getEnabled() {
        // Return a list of enabled clients.
        return this.http.get(
            environment.API_ENDPOINT + this.apiFragment + '/enabled',
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }
}
