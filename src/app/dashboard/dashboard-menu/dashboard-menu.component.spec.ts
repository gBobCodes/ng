/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService, FilterService, RuleService, UserService } from '../../_services/index';
import { ApplianceCardComponent } from '../../appliance/index';
import { ContentCardComponent } from '../../content/index';
import {
    DashboardActionsComponent,
    DashboardDevelopmentComponent,
    DashboardDeployComponent,
    DashboardExpiredComponent,
    DashboardMenuComponent,
    DashboardRecallComponent,
} from '../index';

describe('DashboardMenuComponent', () => {
    let component: DashboardMenuComponent;
    let fixture: ComponentFixture<DashboardMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplianceCardComponent,
                ContentCardComponent,
                DashboardActionsComponent,
                DashboardDevelopmentComponent,
                DashboardDeployComponent,
                DashboardExpiredComponent,
                DashboardMenuComponent,
                DashboardRecallComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                HttpModule,
                MaterialModule,
                RouterTestingModule
            ],
            providers: [ AlertService, FilterService, RuleService, UserService ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
