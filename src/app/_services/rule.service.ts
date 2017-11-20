import { AlertService } from './alert.service';
import { ContentInterface } from '../_interfaces/index';
import { environment } from '../../environments/environment';
import { Http,  Response } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class RuleService {
    data: any;
    error: any;
    constructor(
        private alertService: AlertService,
        private http: Http,
        private router: Router,
        private userService: UserService,
    ) { }

    private postData(data: ContentInterface) {
        // Post Data to the API endpoint
        return this.http.post(
            environment.API_ENDPOINT + 'rules',
            data,
            this.userService.jwt()
        )  .map(res => res.json());
    }

    private putData(data: ContentInterface) {
        // Put Data to the API endpoint
        return this.http.put(
            environment.API_ENDPOINT + 'rules/' + data.id,
            data,
            this.userService.jwt()
        )  .map(res => res.json());
    }

    private load(endpoint, id: number) {
        return this.http.get(
            environment.API_ENDPOINT + endpoint + '/' + id, this.userService.jwt()
        )
    }

    createNewRule(formData: ContentInterface, url: string) {
        // Send formData to the private post method.
        // Navigate to url, if given.
        this.postData(formData).subscribe(
            response => {
                if(url) {
                    this.router.navigate([url, response.id]);
                }
            },
            error => {
                this.alertService.error('Failed to create the content. Please try again later.');
                console.log('Error Message: ' + error);
            }
        );
    }

    saveRule(formData: ContentInterface, url: string) {
        // Send formData to the private put method.
        // Navigate to url, if given.
        this.putData(formData).subscribe(
            response => {
                if(url) {
                    this.router.navigate([url, response.id]);
                }
            },
            error => {
                this.alertService.error('Failed to save the content. Please try again later.');
                console.log('Error Message: ' + error);
            }
        );
    }

    loadRuleObject(id: number) {
        return this.load('rules', id)
            .map(res => res.json());
    }

    // Dashboard Services:
    getDashboardCounts() {
        // Get Content Counts for the dashboard.
        return this.http.get(
            environment.API_ENDPOINT + 'dashboard/count',
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    getDashboardDevelopData() {
        // Get content data in the review states.
        return this.http.get(
            environment.API_ENDPOINT + 'dashboard/develop',
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    getDashboardDeployData() {
        // Get deployments in proposed/needing export.
        return this.http.get(
            environment.API_ENDPOINT + 'dashboard/deploy',
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    getDashboardRecallData() {
        // Get deployments in the recall needed state.
        return this.http.get(
            environment.API_ENDPOINT + 'dashboard/recall',
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    getDashboardExpiredData() {
        // Get content data in the expired state.
        return this.http.get(
            environment.API_ENDPOINT + 'dashboard/expired',
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    promoteRule(ruleID: number, stateID: number) {
        // Call API to promote the rule to the given state.
        return this.http.put(
            environment.API_ENDPOINT + 'rules/' + ruleID + '/promote/' + stateID + '/',
            {},
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    portRule(ruleID: number) {
        // Call API to port the rule to a new appliance.
        return this.http.put(
            environment.API_ENDPOINT + 'rules/' + ruleID + '/port/',
            {},
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    reviseRule(ruleID: number) {
        // Call API to revise the rule. The response is a new rule.
        return this.http.put(
            environment.API_ENDPOINT + 'rules/' + ruleID + '/revise/',
            {},
            this.userService.jwt()
        ).map((response: Response) => response.json());
    }
}
