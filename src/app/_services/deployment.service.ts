import { AlertService } from './alert.service';
import { DeploymentInterface } from '../_interfaces/index';
import { environment } from '../../environments/environment';
import { Http,  Response } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class DeploymentService {
    data: any;
    error: any;
    constructor(
        private alertService: AlertService,
        private http: Http,
        private router: Router,
        private userService: UserService,
    ) { }

    private postData(data: DeploymentInterface) {
        // Post Data to the API endpoint
        return this.http.post(
            environment.API_ENDPOINT + 'deployment',
            data,
            this.userService.jwt()
        )  .map(res => res.json());
    }

    private putData(data: DeploymentInterface) {
        // Put Data to the API endpoint
        return this.http.put(
            environment.API_ENDPOINT + 'deployment/' + data.id,
            data,
            this.userService.jwt()
        )  .map(res => res.json());
    }

    private load(endpoint, id: number) {
        return this.http.get(
            environment.API_ENDPOINT + endpoint + '/' + id, this.userService.jwt()
        )
    }

    loadDeploymentObject(id: number) {
        // return single deployment object
        return this.load('deployment', id)
            .map(res => res.json());
    }

    promoteDeployment(deploymentID: number, stateID: number) {
        // Call API to promote the deployment to the given state.
        return this.http.put(
            environment.API_ENDPOINT + 'deployment/' + deploymentID + '/promote/' + stateID,
            {},
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }
}