import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
    ClientInterface,
    ContentInterface,
    DeploymentInterface,
} from '../../_interfaces/index';
import { AlertService, ClientService } from '../../_services/index';

@Component({
    selector: 'cnx-deployment-detail',
    templateUrl: './deployment-detail.component.html',
    outputs: ['deployment']
})
export class DeploymentDetailComponent implements OnInit {
    @Input() content: ContentInterface;
    @Input() deployment: DeploymentInterface;
    client: ClientInterface;
    dateFormat = environment.DATE_FORMAT;

    constructor(
        private alertService: AlertService,
        private clientService: ClientService,
    ){
    }

    ngOnInit() {
        // Get the client by calling the API.
        this.getClient();
    }

    private getClient():void {
        // Get the client for this deployment's appliance.
        if(this.deployment) {
            this.clientService.get(this.deployment.appliance.client).subscribe(
                data => {
                    this.client = Object.assign( new ClientInterface(), data);
                },
                error => {
                    this.alertService.error(error);
                }
            )
        }
    }
}
