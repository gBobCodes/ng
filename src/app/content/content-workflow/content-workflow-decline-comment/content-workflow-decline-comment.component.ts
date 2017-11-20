import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ContentInterface, CommentInterface } from '../../../_interfaces/index';
import { AlertService, CommentService, UserService } from '../../../_services/index';


@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './content-workflow-decline-comment.component.html'
})

export class DeclineComment {
    constructor(
        @Inject(MD_DIALOG_DATA) private data: {
            content: ContentInterface,
            commentModel: string
        },
        private alertService: AlertService,
        private commentService: CommentService,
        public dialogRef: MdDialogRef<DeclineComment>,
        private formBuilder: FormBuilder,
        private userService: UserService,
    ) {}

    content: ContentInterface;
    commentForm: FormGroup;
    currentUser: any;
    commentModel: string;

    ngOnInit() {
        this.content = this.data.content;
        this.commentModel = this.data.commentModel;
        this.currentUser = this.userService.getCurrent();

        this.commentForm = this.formBuilder.group({
            note: ['', [Validators.required]],
        })
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
        // save comment update
        this.commentService.postData(value, this.commentModel).subscribe(
            response => {
                this.dialogRef.close('true');
            },
            error => {
                this.alertService.error(
                    'Failed to add the comment. Please try again later.'
                );
                console.log('Error Message: ' + error);
            }
        );

    }
}

