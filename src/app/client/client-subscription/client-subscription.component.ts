import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DragulaModule, DragulaService } from 'ng2-dragula';

import { routeNames } from '../../app.routing';
import {
    AlertService,
    ArrayService,
    ClientService,
    ProfileService,
    UserService,
} from '../../_services/index';

@Component({
    selector: 'client-subscription',
    templateUrl: './client-subscription.component.html',
})
export class ClientSubscriptionComponent {
    // Display a form where the user can subscribe to clients.

    public clientsAssigned = [];
    public clientsAvailable = [];
    public initialAssigned:any;
    public initialAvailable:any;
    public v:any;

    public constructor(
        private alertService: AlertService,
        private arrayService: ArrayService,
        private clientService: ClientService,
        private dragulaService: DragulaService,
        private profileService: ProfileService,
        private router: Router,
        private userService: UserService,
    ) {
    }

    ngOnInit() {
        // Clean up any leftover "bags" then setup a new one.
        const bag: any = this.dragulaService.find('clients');
        if (bag !== undefined ) this.dragulaService.destroy('clients');

        this.dragulaService.setOptions(
            'clients', {
                removeOnSpill: false,
            }
        );

        // Set initial values of clients lists to refresh form when needed
        // Putting the results directly into clientsAssigned/Available alters the 
        // lists directly which makes the cancel button irrelevant and nonfunctional
        this.clientService.available().subscribe(result => { this.initialAvailable = result; });
        this.clientService.subscribed().subscribe(result => { this.initialAssigned = result; })

        this.setClients();
    }

    private onSave() {
        // User clicked Save button. Call the profile update API to save clients
        // add the clients to a copy of the current user
        let currentUser = this.userService.getCurrent();
        currentUser.profile.clients = this.arrayService.getIds(
            this.clientsAssigned
        );
        this.profileService.put(currentUser.profile).subscribe(
            response => {
                // API call was successful.
                this.saveLocalClients();
                this.closeModal();
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

    private saveLocalClients(): void {
        // update the 'clients' in local storage for the current user.
        this.userService.updateLocalClients(this.clientsAssigned);
        this.refresh();
    }

    private closeModal() {
        // closes the visible modal dialog box
        this.router.navigate([routeNames.clients]).then(() =>
            this.router.navigate([".", { outlets: { modaloutlet: null } }]));

        this.refresh();
    }

    private refresh() {
        // Refresh all relevant service values
        this.clientService.refreshAll();
        this.clientService.refreshSubscribed();
        this.clientService.refreshAvailable();
    }

    private setClients() {
        // put current live values into dragula(unsaved) lists
        for(let client of this.initialAssigned) {
            this.clientsAssigned.push(client);
        }
        for(let client of this.initialAvailable) {
            this.clientsAvailable.push(client);
        }
    }
}
