import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { routeNames } from '../../app.routing';

import { FilterService } from '../../_services/index';


@Component({
    selector: 'cnx-content-search',
    templateUrl: './content-search.component.html',
    styleUrls: ['./content-search.component.scss']
})
export class ContentSearchComponent implements OnInit {

    public filterResults:any;
    public filterParams:any;
    dateFormat = environment.DATE_FORMAT;

    constructor(
        private filterService: FilterService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.filterService.params().subscribe(result => { this.filterParams = result });
        this.filterService.results().subscribe(result => { this.filterResults = result });
    }

    onView(contentId) {
        // User clicked the Content card. Open Content View page.
        this.router.navigate([routeNames.contentView, contentId]);
    }
}
