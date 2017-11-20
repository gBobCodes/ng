import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
    MaterialModule,
    MdCheckboxModule,
    MdInputModule,
} from '@angular/material';

import { 
    AlertService,
    ClientService,
    DeploymentService,
    RuleService,
    UserService,
} from '../../_services/index';
import { DeploymentInterface } from '../../_interfaces/index';

import { AlertComponent } from '../../_directives/index';
import { CommentsComponent } from '../../content/content-comments/content-comments.component';
import { ContentActionsComponent } from '../../content/content-actions/content-actions.component';
import { ContentDetailComponent } from '../../content/content-detail/content-detail.component';
import { ContentViewComponent } from '../../content/content-view/content-view.component';
import { ContentWorkflowComponent } from '../../content/content-workflow/content-workflow.component';
import { DeploymentDetailComponent } from '../deployment-detail/deployment-detail.component';
import { DeploymentWorkflowComponent } from '../deployment-workflow/deployment-workflow.component';

import { DeploymentViewComponent } from './deployment-view.component';

describe('DeploymentViewComponent', () => {
    let component: DeploymentViewComponent;
    let fixture: ComponentFixture<DeploymentViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AlertComponent,
                CommentsComponent,
                ContentActionsComponent,
                ContentDetailComponent,
                ContentViewComponent,
                ContentWorkflowComponent,
                DeploymentDetailComponent,
                DeploymentViewComponent,
                DeploymentWorkflowComponent,
             ],
             imports: [
                HttpModule,
                MaterialModule,
                MdCheckboxModule,
                MdInputModule,
                ReactiveFormsModule,
                RouterTestingModule,
             ],
            providers: [
                AlertService,
                ClientService,
                DeploymentService,
                RuleService,
                UserService,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeploymentViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
