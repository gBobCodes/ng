import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
    MaterialModule,
    MdCheckboxModule,
    MdInputModule,
} from '@angular/material';

import { DeploymentInterface } from '../../_interfaces/index';
import { 
    AlertService,
    ClientService,
    DeploymentService,
    DownloadService,
    RuleService,
    UserService,
} from '../../_services/index';

import { DeploymentWorkflowComponent } from './deployment-workflow.component';

describe('DeploymentWorkflowComponent', () => {
  let component: DeploymentWorkflowComponent;
  let fixture: ComponentFixture<DeploymentWorkflowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DeploymentWorkflowComponent,
            ],
            imports: [
                HttpModule,
                MaterialModule,
                MdCheckboxModule,
                MdInputModule,
                RouterTestingModule,                
            ],
            providers: [
                AlertService,
                DeploymentService,
                DownloadService,
                UserService,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeploymentWorkflowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
