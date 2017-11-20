import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import {
    AlertService,
    DeploymentService,
    DownloadService
} from '../../_services/index';
import {
    ClientInterface,
    ContentInterface,
    DeploymentInterface,
} from '../../_interfaces/index';
import {
    NetwitnessDialog,
} from '../../appliance/appliance-card/appliance-card-netwitness-dialog/appliance-card-netwitness-dialog.component';
import { DeclineComment } from '../../content/content-workflow/content-workflow-decline-comment/content-workflow-decline-comment.component';


@Component({
    selector: 'cnx-deployment-workflow',
    templateUrl: './deployment-workflow.component.html',
})
export class DeploymentWorkflowComponent {
    @Input() client: ClientInterface;
    @Input() content: ContentInterface;
    @Input() deployment: DeploymentInterface;
    @Output() deploymentChange = new EventEmitter<DeploymentInterface>();
    // netwitness dialog variables
    nwIndex: number;
    nwKey: string;

    constructor(
        private alertService: AlertService,
        private deploymentService: DeploymentService,
        public dialog: MdDialog,
        private downloadService: DownloadService,
    ) { }

    onCheckState(state: any) {
        // A workflow action button was clicked. Promote the deployment.
        if(state.slug == 'exported') {
            // Export the content to a text file.
            let exportData = {
                filename: this.downloadService.filename(this.client.name, this.deployment.appliance),
                nwKey: '',
                nwIndex: 0,
                platform: this.content.platform.name,
                rule: [{'content': this.content.content, 'title': this.content.title}],
            };

            // Is this a netwitness deployment
            let netwitness = exportData.platform.match(/netwitness/i) ? true : false;

            if(!netwitness) {
                let dialogRef = this.dialog.open(
                    NetwitnessDialog,
                    {data: { nwKey: this.nwKey, nwIndex: this.nwIndex }}
                );
                dialogRef.afterClosed().subscribe(result => {
                    if(result.nwKey && result.nwIndex) {
                        exportData.nwKey = result.nwKey;
                        exportData.nwIndex = result.nwIndex;
                        this.downloadService.exportContent(exportData);
                        this.onPromote(state.id);
                    }
                });
            } else {
                this.downloadService.exportContent(exportData);
                this.onPromote(state.id);
            }
        } else if (state.slug == 'declined') {
            let dialogRef = this.dialog.open(
                DeclineComment, {
                    data: {
                        content: this.deployment,
                        commentModel: 'deployment'
                    }
                }
            );
            dialogRef.afterClosed().subscribe(result => {
                if(result === 'true') {
                    this.onPromote(state.id);
                }
            });
        } else {
            // Promotions other than Export
            this.onPromote(state.id);
        }
    }

    onPromote(nextStateID: number) {
        // nextStateID is the ID of the the state clicked in deployment.next_states.
        this.deploymentService.promoteDeployment(this.deployment.id, nextStateID).subscribe(
            data => {
                this.deployment = Object.assign( new DeploymentInterface(), data);
                // Notify the parent component that we have an updated deployment.
                this.deploymentChange.emit(this.deployment);
            },
            error => {
                this.alertService.error('Failed to promote deployment.');
                console.log('Error Message: ' + error);
            }
        );
    }
}
