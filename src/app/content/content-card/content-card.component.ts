import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { routeNames } from '../../app.routing';
import { ContentInterface } from '../../_interfaces/index';

@Component({
    selector: 'cnx-content-card',
    templateUrl: './content-card.component.html',
    styleUrls: ['../content.scss', '../../dashboard/dashboard.scss']
})
export class ContentCardComponent implements OnInit {
    @Input() content: ContentInterface;
    @Input() editable: boolean = true;
    dateFormat = environment.DATE_FORMAT;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    onEdit(contentId) {
        // User clicked Edit button. Open Content Edit page.
        this.router.navigate([routeNames.contentEdit, this.content.id]);
    }

    onView(contentId) {
        // User clicked the Content card. Open Content View page.
        this.router.navigate([routeNames.contentView, this.content.id]);
    }
}
