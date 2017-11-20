import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, RuleService } from '../../_services/index';
import { ContentInterface } from '../../_interfaces/index';
import { routeNames } from '../../app.routing';

@Component({
    selector: 'cnx-content-actions',
    templateUrl: './content-actions.component.html',
    styleUrls: ['../content.scss']
})
export class ContentActionsComponent implements OnInit {
    /*
    Each action has a property that the template will use
    to hide/show the action buttons.
    */
    @Input() content: ContentInterface;

    constructor(
        private alertService: AlertService,
        private ruleService: RuleService,
        private router: Router,
    ) { }

    ngOnInit() {
    }

    onEdit() {
        // User clicked the Edit button, go to Edit screen.
        this.router.navigate([routeNames.contentEdit, this.content.id]);
    }

    onPort() {
        // Create a new piece of content, then redirect the user to the new,
        // content edit page.
        this.ruleService.portRule(this.content.id).subscribe(
            data => {
                var new_content = Object.assign(
                    new ContentInterface(),
                    data
                );
                // Route user to new ported content
                this.router.navigate([routeNames.contentEdit, new_content.id]);
            },
            error => {
                this.alertService.error('Failed to port content.');
                console.log('Error Message: ' + error);
            }
        );

    }

    onRevise() {
        // User clicked the Revise button.
        // Revise the rule and go to the edit screen.
        this.ruleService.reviseRule(this.content.id).subscribe(
            data => {
                var new_content = Object.assign(
                    new ContentInterface(),
                    data
                );
                this.router.navigate([routeNames.contentEdit, new_content.id]);
            },
            error => {
                this.alertService.error('Failed to revise content.');
                console.log('Error Message: ' + error);
            }
        );
    }
}
