import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../../_services/index';

@Component({
    selector: 'cnx-dashboard-actions',
    templateUrl: './dashboard-actions.component.html',
    styleUrls: ['../dashboard.scss'],
})
export class DashboardActionsComponent implements OnInit {
    constructor(
        private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService,
    ) { }

    ngOnInit() { }
}
