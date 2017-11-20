import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ContentInterface } from '../../_interfaces/index';

@Component({
    selector: 'cnx-content-detail',
    templateUrl: './content-detail.component.html',
    styleUrls: ['../content.scss'],
    outputs: ['content', 'commentscount']
})
export class ContentDetailComponent {
    @Input() content: ContentInterface;
    commentCount: number;
    dateFormat = environment.DATE_FORMAT;

    constructor() {
    }

    ngDoCheck() {
        this.commentCount = this.content.comments.length
    }

}
