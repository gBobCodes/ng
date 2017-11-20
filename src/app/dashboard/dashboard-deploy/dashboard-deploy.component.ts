import { Component, OnInit, Output } from '@angular/core';

import { AlertService, RuleService } from '../../_services/index';

@Component({
    selector: 'cnx-dashboard-deploy',
    templateUrl: './dashboard-deploy.component.html',
    styleUrls: [
        '../dashboard.scss',
        '../../appliance/appliance-card/appliance-card.component.scss'
    ],
})
export class DashboardDeployComponent implements OnInit {

    deploy = {};

    constructor(
        private alertService: AlertService,
        private ruleService: RuleService
    ) { }

    ngOnInit() {
        // Call the API to get the Develop data.
        this.getDeployData()
    }

    private getDeployData() {
        // Call Dashboard Deploy API to get Deploy Data
        this.ruleService.getDashboardDeployData().subscribe(
            data => {
                this.deploy = data;
            },
            error => {
                this.alertService.error('Failed to load the deploy content')
            }
        );
    }
}
