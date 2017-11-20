import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { CommentInterface, ContentInterface } from '../../_interfaces/index';
import { CommentService, RuleService, UserService,  } from '../../_services/index';
import { routeNames } from '../../app.routing';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'cnx-content-comments',
  templateUrl: './content-comments.component.html',
  styleUrls: ['./content-comments.component.scss']
})
export class CommentsComponent implements OnInit {
    @Input() content: ContentInterface;

    @Input() commentCount: number;
    @Output() commentCountChange = new EventEmitter<number>();

    @Input() commentModel: string;

    dateFormat = environment.DATE_FORMAT;

    constructor(
        private commentService: CommentService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
    ) { }

    // Variables to hold component working data
    addComment: boolean = false;
    comments: Observable<any>;
    currentUser: any;
    editId: number;
    readonly noId: number = null;


    // Data interface and reactive form
    comment: CommentInterface;
    commentForm: FormGroup;

    ngOnInit() {
        // Get Current User Object
        this.currentUser = this.userService.getCurrent();
        // Get list of comments for the selected content
        if (this.content) {
            this.comments = this.commentService.getComments(this.content.id, this.commentModel);
            // Create the reactive form with default (blank) values
            this.commentForm = this.formBuilder.group({
                note: ['', [Validators.required]],
            })
        }
    }

    ngOnChanges() {
        // Update comments if a change is made elsewhere on the content page
        // Mainly the Decline verification.
        if (this.content) {
            this.comments = this.commentService.getComments(this.content.id, this.commentModel);
        }
    }

    onSubmit({value, valid}: {value: CommentInterface, valid: boolean}) {
        // Save Comment
        // Add Author and Rule information to comment
        value.author = this.currentUser.id;
        if (this.commentModel === 'deployment') {
            value.deployment = this.content.id;
        } else {
            value.rule = this.content.id;
        }

        if(this.editId>this.noId) {
            // Set selected comment ID for update reference
            value.id = this.editId;
            // save comment update
            this.commentService.putData(value, this.commentModel).subscribe(
                response => {
                    this.comments = this.commentService.getComments(this.content.id, this.commentModel);
                },
                error => {
                    this.alertService.error(
                        'Failed to update the comment. Please try again later.'
                    );
                    console.log('Error Message: ' + error);
                }
            );
            this.toggleEditCancel();
        } else {
            // Add new comment
            this.commentService.postData(value, this.commentModel).subscribe(
                response => {
                    this.comments = this.commentService.getComments(this.content.id, this.commentModel);
                    this.commentCount = this.commentCount + 1;
                    this.commentCountChange.emit(this.commentCount);
                },
                error => {
                    this.alertService.error(
                        'Failed to create the comment. Please try again later.'
                    );
                    console.log('Error Message: ' + error);
                }
            );
            // Close the add comment form
            this.toggleAdd();
            // Clear the commentForm values
            this.commentForm.reset();
        }
    }

    toggleEditCancel() {
        // Close the editing feature for selected comment
        this.commentForm.reset();
        this.editId = this.noId;
    }

    toggleAdd() {
        // Toggle the Add Comment form
        // Close any open edit forms
        this.toggleEditCancel();
        // Toggle the Add Comment form
        this.addComment = !this.addComment;
    }

    toggleEdit(id: number) {
        // Open the selected comment Edit Form
        this.addComment = false;
        this.editId = id;
    }
}
