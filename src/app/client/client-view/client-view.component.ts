import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import {
    AlertService,
    MessageService,
    UserService,
} from '../../_services/index';
import { routeNames } from '../../app.routing';

@Component({
    selector: 'cnx-client-view',
    templateUrl: './client-view.component.html',
    styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

    message: any;
    subscription: Subscription;
    showClientAddForm = false;    // Display the add form if true
    userCanAdd = false;
    
    constructor(
        private alertService: AlertService,
        private messageService: MessageService,
        private router: Router,        
        private userService: UserService,
    ) {
        this.subscription = this.messageService.getMessage().subscribe(
            message => { this.message = message; }
        );
    }
    
    ngOnInit() {
        this.userCanAdd = this.userService.canAdd('client');
    }
    
    ngDoCheck() {
        /*
        If the message is about a created client, 
        redirect to the client's detail view. /client/<new id>
        Message format is 'newClientId:new client created'
        */
        if(this.message) {
            if(this.message.subject.includes('new client created')) {
                const newClientId = this.message.subject.split(':')[0];
                this.messageService.clearMessage();
                this.messageService.sendMessage(
                    'refresh client list',
                    undefined
                );
                this.router.navigate([routeNames.clients, newClientId]);
            }
        }
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }


}
