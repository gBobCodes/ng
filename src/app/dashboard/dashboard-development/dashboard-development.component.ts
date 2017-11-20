import { Component, OnInit, Output } from '@angular/core';

import { AlertService, RuleService, UserService } from '../../_services/index';

@Component({
    selector: 'cnx-dashboard-development',
    templateUrl: './dashboard-development.component.html',
    styleUrls: ['../dashboard.scss'],
})
export class DashboardDevelopmentComponent implements OnInit {
    // Does the current user belong to these groups?
    author: boolean;
    engineer: boolean;
    qa: boolean;
    sme: boolean;
    develop = {};
    keys = [];

    constructor(
        private alertService: AlertService,
        private userService: UserService,
        private ruleService: RuleService
    ) { }

    ngOnInit() {
        // Call the API to get the Develop data.
        this.author = this.userService.hasGroup('Author');
        this.engineer = this.userService.hasGroup('Engineer');
        this.qa = this.userService.hasGroup('QA');
        this.sme = this.userService.hasGroup('SME');
        this.getDevelopData()
    }

    private getDevelopData() {
        // Call Dashboard Develop API to get Develop Data
        this.ruleService.getDashboardDevelopData().subscribe(
            data => {
                this.develop = data;
                for (let key in this.develop) {
                    if (this.develop[key].length > 0) {
                        this.keys.push(key);
                    }
                }
            },
            error => {
                this.alertService.error('Failed to load the dashboard content')
            }
        );
    }
}
