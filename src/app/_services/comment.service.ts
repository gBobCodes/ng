import { AlertService } from './alert.service';
import { CommentInterface } from '../_interfaces/index';
import { environment } from '../../environments/environment';
import { Http,  Response } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentService {
    apiFragment: string;
    data: any;
    error: any;
    constructor(
        private alertService: AlertService,
        private http: Http,
        private router: Router,
        private userService: UserService,
    ) { }

    postData(data: CommentInterface, commentModel: string) {
        // Post Data to the API endpoint
        this.setFragment(commentModel);
        return this.http.post(
            environment.API_ENDPOINT + this.apiFragment,
            data,
            this.userService.jwt()
        )  .map(res => res.json());
    }

    putData(data: CommentInterface, commentModel: string) {
        // Put Data to the API endpoint
        this.setFragment(commentModel);
        return this.http.put(
            environment.API_ENDPOINT + this.apiFragment + '/' + data.id,
            data,
            this.userService.jwt()
        )  .map(res => res.json());
    }

    getComments(ruleID: number, commentModel: string) {
        this.setFragment(commentModel);
        return this.http.get(
            environment.API_ENDPOINT + this.apiFragment + '/' + ruleID,
            this.userService.jwt()
        ).map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(
                error.json().error || 'Server error')
            );
    }

    private setFragment(commentModel) {
        if (commentModel === 'deployment') {
            this.apiFragment = 'comments/deployment'
        } else {
            this.apiFragment = 'comments/rule';
        }
    }
}
