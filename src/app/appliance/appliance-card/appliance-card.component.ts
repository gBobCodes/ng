import { Component, Input, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { routeNames } from '../../app.routing';
import { ApplianceInterface } from '../../_interfaces/index';
import {
    AlertService,
    DeploymentService,
    DownloadService,
} from '../../_services/index';
import { NetwitnessDialog } from './appliance-card-netwitness-dialog/appliance-card-netwitness-dialog.component';


@Component({
    selector: 'cnx-appliance-card',
    templateUrl: './appliance-card.component.html',
    styleUrls: ['./appliance-card.component.scss', '../../dashboard/dashboard.scss']
})
export class ApplianceCardComponent {
    @Input() appliance;
    @Input() clientName;
    dateFormat = environment.DATE_FORMAT;
    // netwitness dialog variables
    nwIndex: number;
    nwKey: string;

    constructor(
        private alertService: AlertService,
        private deploymentService: DeploymentService,
        public dialog: MdDialog,
        private downloadService: DownloadService,
        private router: Router,
    ) { }

    actionExport(exportData) {
        // promote rule deployment and push rules & content into the 
        // exportData object for file creation
        var self = this;
        this.appliance.workflows.forEach(function(workflow) {
            if(workflow.status == 'Proposed') {
                workflow.deployments.forEach(function(deployment) {
                    if(deployment.next_state_id != 0) {
                        // Capture the content to be exported.
                        exportData.platform = deployment.rule.platform;
                        exportData.rule.push(deployment.rule);
                        // Promote the deployment object to Exported state.
                        self.deploymentService.promoteDeployment(deployment.id, deployment.next_state_id).subscribe(
                            data => {
                                deployment.next_state_id = data.next_states[0].id;
                                workflow.status = 'Exported';
                            },
                            error => {
                                this.alertService.error('Failed to promote content.');
                                console.log('Error Message: ' + error);
                            }
                        );
                    }
                });
            }
        });

        if(exportData.rule.length > 0) {
            this.downloadService.exportContent(exportData);
        }

        return exportData;
    }

    onDeployed() {
        // User clicked Deployed button.
        // Promote all Exported deployments for this appliance to the Deployed state.
        var self = this;
        this.appliance.workflows.forEach(function(workflow) {
            if(workflow.status == 'Exported') {
                workflow.deployments.forEach(function(deployment) {
                    if(deployment.next_state_id != 0) {
                        self.deploymentService.promoteDeployment(deployment.id, deployment.next_state_id).subscribe(
                            data => {
                                deployment.next_state_id = 0;
                                workflow.status = 'Deployed';
                            },
                            error => {
                                this.alertService.error('Failed to promote content.');
                                console.log('Error Message: ' + error);
                            }
                        );
                    }
                });
            }
        });
    }

    onExport() {
        // User clicked Export button.
        // Export all Proposed deployments for this appliance.
        var self = this;
        let exportData = {
            filename: '',
            nwKey: '',
            nwIndex: 0,
            platform: '',
            rule: [],
        };
        let netwitness = this.appliance.workflows[0].deployments[0].rule.platform.match(/netwitness/i) ? true : false;

        exportData.filename = this.downloadService.filename(this.clientName, this.appliance);        

        if(netwitness) {
            let dialogRef = this.dialog.open(
                NetwitnessDialog,
                {data: { nwKey: this.nwKey, nwIndex: this.nwIndex }}
            );
            dialogRef.afterClosed().subscribe(result => {
                if(result.nwKey && result.nwIndex) {
                    exportData.nwKey = result.nwKey;
                    exportData.nwIndex = result.nwIndex;
                    exportData = this.actionExport(exportData);
                }
            });
        } else {
            exportData = this.actionExport(exportData);
        } 
    }

    onRecalled() {
        // User clicked Recalled button.
        // Promote all Recall Needed deployments for this appliance to the Recalled state.
        var self = this;
        this.appliance.workflows.forEach(function(workflow) {
            if(workflow.status == 'Recall Needed') {
                workflow.deployments.forEach(function(deployment) {
                    if(deployment.next_state_id != 0) {
                        self.deploymentService.promoteDeployment(deployment.id, deployment.next_state_id).subscribe(
                            data => {
                                deployment.next_state_id = 0;
                                workflow.status = 'Recalled';
                            },
                            error => {
                                this.alertService.error('Failed to promote content.');
                                console.log('Error Message: ' + error);
                            }
                        );
                    }
                });
            }
        });
    }

    onView(deploymentId) {
        // User clicked to view deployment detail.
        this.router.navigate([routeNames.deployment, deploymentId]);        
    }
}