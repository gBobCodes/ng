import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FilterInterface } from '../../_interfaces/index';
import { AlertService, FilterService, RuleService } from '../../_services/index';

@Component({
    selector: 'cnx-dashboard-expired',
    templateUrl: './dashboard-expired.component.html',
    styleUrls: [
        '../dashboard.scss',
        '../../appliance/appliance-card/appliance-card.component.scss'
    ],

})
export class DashboardExpiredComponent implements OnInit {

    expired: any;
    keys = [];

    constructor(
        private alertService: AlertService,
        private filterService: FilterService,
        private ruleService: RuleService
    ) { }

    ngOnInit() {
        // Call the API to get the Develop data.
        this.getExpiredData()
    }

    private getExpiredData() {
        // Call Dashboard Develop API to get Develop Data
        this.ruleService.getDashboardExpiredData().subscribe(
            data => {
                this.expired = data;
                for (let key in this.expired) {
                    if (this.expired[key].length > 0) {
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
