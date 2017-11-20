import { Component, Input, OnInit } from '@angular/core';

import {
    UserService,
} from '../../_services/index';
import { ApplianceInterface } from '../../_interfaces/index';

@Component({
    selector: 'cnx-appliance-detail',
    templateUrl: './appliance-detail.component.html',
    styleUrls: ['./appliance-detail.component.scss']
})
export class ApplianceDetailComponent implements OnInit {
    /*
    Display an appliance.
    Allow modify if user has permissions.
    */
    @Input() appliance: ApplianceInterface;
    showApplianceModifyForm = false;
    userCanModifyAppliance = false;
    
    constructor(
        private userService: UserService,
    ) {        
    }
    
    ngOnInit() {
        this.userCanModifyAppliance = this.userService.canUpdate('appliance');
    }
}
