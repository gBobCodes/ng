import { NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
    MaterialModule,
    MdDialog,
    MdDialogModule,
} from '@angular/material';

import { DeclineComment } from './content-workflow-decline-comment.component';
import { AlertService, CommentService, UserService  } from '../../../_services/index';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [ DeclineComment ],
    entryComponents: [ DeclineComment ],
    exports: [ DeclineComment ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpModule,
        MaterialModule,
    ],
    providers: [ AlertService, CommentService, UserService  ],
})
class TestModule { }

describe('DeclineComment', () => {
    let component: DeclineComment;
    let dialog: MdDialog;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule,
                BrowserModule,
                BrowserAnimationsModule,
                MdDialogModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        dialog = TestBed.get(MdDialog);
        let dialogRef = dialog.open(DeclineComment);
        component = dialogRef.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
