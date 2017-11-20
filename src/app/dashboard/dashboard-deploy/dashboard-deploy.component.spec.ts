/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService, RuleService, UserService } from '../../_services/index';
import { ApplianceCardComponent } from '../../appliance/index';
import { ContentCardComponent } from '../../content/index';
import { DashboardDeployComponent } from '../index';

describe('DashboardDeployComponent', () => {
    let component: DashboardDeployComponent;
    let fixture: ComponentFixture<DashboardDeployComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplianceCardComponent,
                ContentCardComponent,
                DashboardDeployComponent,
            ],
            imports: [
                HttpModule,
                MaterialModule,
                RouterTestingModule
            ],
            providers: [ AlertService, RuleService, UserService, ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardDeployComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
