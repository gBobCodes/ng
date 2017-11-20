import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import {
    AlertService,
    ClientService,
    MessageService,
    UserService,
} from '../../_services/index';
import { ApplianceInterface, ClientInterface } from '../../_interfaces/index';

@Component({
    selector: 'cnx-client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
    /*
    Display the client details and the details of the appliances.
    Allow the edit of client details.
    Allow adding new appliance.
    */

    appliances: Array<ApplianceInterface>;
    client: ClientInterface;
    message: any;
    showApplianceAddForm = false;
    showClientModifyForm = false;
    subscription: Subscription;    
    userCanModifyClient = false;
    userCanAddAppliance = false;

    constructor(
        private alertService: AlertService,
        private clientService: ClientService,
        private messageService: MessageService,
        private route: ActivatedRoute,        
        private userService: UserService,
    ) {
        this.subscription = this.messageService.getMessage().subscribe(
            message => { this.message = message; }
        );
    }

    ngOnInit() {
        this.getClient();
        this.userCanModifyClient = this.userService.canUpdate('client');
        this.userCanAddAppliance = this.userService.canAdd('appliance');
    }

    ngDoCheck() {
        // If the message is about a new appliance, get the appliances.
        if(this.message) {
            if(this.message.subject === 'new appliance created') {
                this.messageService.clearMessage();
                this.getClientAppliances();
            }
        }
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    private getClient():void {
        // Get client object from API
        this.route.params.subscribe(
            params => {
                const id = + params['id'];
                if(id) {
                    this.clientService.get(id).subscribe(
                        data => {
                            this.client = Object.assign( new ClientInterface(), data);
                            this.getClientAppliances();
                        },
                        error => {
                            this.alertService.error(error);
                        }
                    );
                }
            }
        );
    }

    private getClientAppliances():void {
        // Get all appliances for this client from API
        if(this.client) {
            this.clientService.getAppliances(this.client.id).subscribe(
                data => {
                    this.appliances = data;
                },
                error => {
                    this.alertService.error(error);
                }
            );
        }
    }

}
