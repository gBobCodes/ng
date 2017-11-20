import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import {
    MaterialModule,
    MdCheckboxModule,
    MdInputModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertService, RuleService, UserService } from '../../_services/index';
import { AlertComponent } from '../../_directives/index';
import { ContentInterface } from '../../_interfaces/index';

import { ContentActionsComponent } from './content-actions.component';

describe('ContentActionsComponent', () => {
    let component: ContentActionsComponent;
    let fixture: ComponentFixture<ContentActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AlertComponent, ContentActionsComponent ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                ContentInterface,
                MaterialModule,
                MdCheckboxModule,
                MdInputModule,
                ReactiveFormsModule,
                RouterTestingModule,
                HttpModule
                ],
            providers: [ AlertService, RuleService, UserService ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

/*    it('should be created', () => {
        expect(component).toBeTruthy();
    });*/
});
