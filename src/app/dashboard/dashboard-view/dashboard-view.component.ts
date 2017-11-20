import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../../_services/index';

@Component({
    selector: 'cnx-dashboard-view',
    templateUrl: './dashboard-view.component.html',
    styleUrls: ['../dashboard.scss'],
})
export class DashboardViewComponent implements OnInit {
    // Does the current user belong to these groups?
    administratorOnly = false;
    liaisonOnly = false;
    userMessage: string;

    constructor(
        private userService: UserService,
    ) { }

    ngOnInit() {
        if(this.userService.hasGroup('Administrator') && this.userService.groupCount() == 1) {
            this.administratorOnly = true;
            this.userMessage = 'Welcome. The administration menu is under your name.';
        }
        if(this.userService.hasGroup('Liaison') && this.userService.groupCount() == 1) {
            this.liaisonOnly = true;
            this.userMessage = 'Welcome. Use the menu above to see your client list.';
        }
     }
    
}
