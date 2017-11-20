import { Component, OnInit, Output } from '@angular/core';

import { AlertService, RuleService } from '../../_services/index';

@Component({
    selector: 'cnx-dashboard-recall',
    templateUrl: './dashboard-recall.component.html',
    styleUrls: [
        '../dashboard.scss',
        '../../appliance/appliance-card/appliance-card.component.scss'
    ],

})
export class DashboardRecallComponent implements OnInit {

    recall = {};

    constructor(
        private alertService: AlertService,
        private ruleService: RuleService
    ) { }

    ngOnInit() {
        // Call the API to get the Develop data.
        this.getRecallData()
    }

    private getRecallData() {
        // Call Dashboard Deploy API to get Deploy Data
        this.ruleService.getDashboardRecallData().subscribe(
            data => {
                this.recall = data;
            },
            error => {
                this.alertService.error('Failed to load the recall content')
            }
        );
    }
}
