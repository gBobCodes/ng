import { Component, OnInit, Output } from '@angular/core';
import { AlertService, RuleService, UserService } from '../../_services/index';

@Component({
    selector: 'cnx-dashboard-menu',
    templateUrl: './dashboard-menu.component.html',
    styleUrls: ['../dashboard.scss'],
})
export class DashboardMenuComponent implements OnInit {
    constructor(
        private alertService: AlertService,
        private ruleService: RuleService,
        private userService: UserService
    ) { }
    counts = {};
    expiredPermissions = false;

    ngOnInit() {
        this.getMenuCounts()
        if (this.userService.hasGroup('QA')) {
            this.expiredPermissions = true;
        }
    }

    private getMenuCounts() {
        // Get the dashboard menu counts from the dashboard API
        this.ruleService.getDashboardCounts().subscribe(
            data => {
                this.counts = data
            },
            error => {
                this.alertService.error('Failed to load the dashboard menu')
            }
        );
    }
}
