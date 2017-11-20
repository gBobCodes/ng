import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AlertService, RuleService } from '../../_services/index';
import { ContentInterface } from '../../_interfaces/index';
import { ArchiveDialog } from './content-workflow-archive-dialog/content-workflow-archive-dialog.component'
import { DeclineComment } from './content-workflow-decline-comment/content-workflow-decline-comment.component';

@Component({
    selector: 'cnx-content-workflow',
    templateUrl: './content-workflow.component.html',
    styleUrls: ['../content.scss']
})
export class ContentWorkflowComponent implements OnInit {
    @Input() content: ContentInterface;
    @Output() contentChange = new EventEmitter<ContentInterface>();

    constructor(
        private alertService: AlertService,
        private ruleService: RuleService,
        public dialog: MdDialog,
    ) { }

    ngOnInit() {}

    onCheckState(state: any) {
        // Check if the state is archive and show confirmation dialog.
        // Otherwise just promote the content.
        if(state.slug == 'archive') {
            let dialogRef = this.dialog.open(
                ArchiveDialog
            );
            dialogRef.afterClosed().subscribe(result => {
                if(result === 'true') {
                    this.onPromote(state.id);
                }
            });
        } else if (state.slug == 'decline') {
            let dialogRef = this.dialog.open(
                DeclineComment, {
                    data: {
                        content: this.content,
                        commentModel: 'content'
                    }
                }
            );
            dialogRef.afterClosed().subscribe(result => {
                if(result === 'true') {
                    this.onPromote(state.id);
                }
            });
        } else {
            this.onPromote(state.id);
        }
    }

    onPromote(nextStateID: number) {
        // nextStateID is the ID of the the state clicked in content.next_states.
        this.ruleService.promoteRule(this.content.id, nextStateID).subscribe(
            data => {
                this.content = Object.assign(
                    new ContentInterface(),
                    data
                );
                // Notify the parent component that we have updated content.
                this.contentChange.emit(this.content);
            },
            error => {
                this.alertService.error('Failed to promote content.');
                console.log('Error Message: ' + error);
            }
        );
    }
}
