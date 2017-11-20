import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AlertService, RuleService, UserService } from '../../_services/index';
import { ContentInterface } from '../../_interfaces/index';

@Component({
    selector: 'cnx-content-view',
    templateUrl: './content-view.component.html',
    styleUrls: ['../content.scss'],
    outputs: ['content']
})
export class ContentViewComponent implements OnInit {
    id: number;
    content: ContentInterface;

    constructor(
        private alertService: AlertService,
        private route: ActivatedRoute,
        private ruleService: RuleService
    ) {
    }

    ngOnInit() {
        this.getContent();
    }

    private getContent():void {
        // Get ContentID and object
        this.route.params.subscribe(
            params => {
                this.id = + params['id'];
                this.ruleService.loadRuleObject(this.id).subscribe(
                    data => {
                        this.content = Object.assign( new ContentInterface(), data);
                    },
                    error => {
                        this.alertService.error(error);
                    }
                );
            }
        );
    }
}
