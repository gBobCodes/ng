import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './content-comments.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { AlertService, CommentService, UserService } from '../../_services/index';

describe('CommentsComponent', () => {
    let component: CommentsComponent;
    let fixture: ComponentFixture<CommentsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CommentsComponent ],
            imports: [
                MaterialModule,
                ReactiveFormsModule,
                RouterTestingModule,
                HttpModule,
            ],
            providers: [ AlertService, CommentService, UserService ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
