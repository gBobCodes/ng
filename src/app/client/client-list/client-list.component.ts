import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ClientInterface } from '../../_interfaces/index';
import { ClientService, MessageService, UserService } from '../../_services/index';

@Component({
    selector: 'cnx-client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
    /*
    Display a list of client names.
    The default list is clients the user has subscribed to.
    If no client subscriptions, display all clients. 
    */

    clientsAll: any;
    clientsSubscribed: any;

    message: any;
    showAll: boolean;
    subscription: Subscription;
    userHasClients = false;

    constructor(
        private clientService: ClientService,
        private messageService: MessageService,
        private userService: UserService,
    ) { }

    ngOnInit() {
        // Watch clients All and current users subscribed client lists
        this.clientService.all().subscribe(result => { this.clientsAll = result; });
        this.clientService.subscribed().subscribe(result => { this.clientsSubscribed = result; });

        this.userHasClients = this.clientsSubscribed.length ? true : false;
 
        // Toggle to display lists. default to showing current user's list
        this.showAll = this.userHasClients ? false : true;
    }

    onToggle() {
        // Toggle all or subscribest lists
        this.showAll = this.showAll ? false : true;
    }
}
