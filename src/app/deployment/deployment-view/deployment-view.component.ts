import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AlertService, DeploymentService, RuleService, UserService } from '../../_services/index';
import { ContentInterface, DeploymentInterface } from '../../_interfaces/index';

@Component({
    selector: 'cnx-deployment-view',
    templateUrl: './deployment-view.component.html',
    outputs: ['content', 'deployment']
})
export class DeploymentViewComponent implements OnInit {
    id: number;
    content: ContentInterface;
    deployment: DeploymentInterface;

    constructor(
        private alertService: AlertService,
        private route: ActivatedRoute,
        private deploymentService: DeploymentService,
        private ruleService: RuleService
    ) {
    }

    ngOnInit() {
        // Get the deployment object by calling the API.
        this.getDeployment();
    }

    private getDeployment():void {
        // Get Deployment ID and object
        this.route.params.subscribe(
            params => {
                this.id = + params['id'];
                this.deploymentService.loadDeploymentObject(this.id).subscribe(
                    data => {
                        this.deployment = Object.assign( new DeploymentInterface(), data);
                        this.getContent(this.deployment.rule);
                    },
                    error => {
                        this.alertService.error(error);
                    }
                );
            }
        );
    }

    private getContent(contentID:number):void {
        // Get Content object
        this.ruleService.loadRuleObject(contentID).subscribe(
            data => {
                this.content = Object.assign( new ContentInterface(), data);
            },
            error => {
                this.alertService.error(error);
            }
        );
    }
}
