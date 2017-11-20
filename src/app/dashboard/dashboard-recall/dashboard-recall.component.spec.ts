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
import { DashboardRecallComponent } from '../index';

describe('DashboardRecallComponent', () => {
    let component: DashboardRecallComponent;
    let fixture: ComponentFixture<DashboardRecallComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplianceCardComponent,
                ContentCardComponent,
                DashboardRecallComponent,
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
        fixture = TestBed.createComponent(DashboardRecallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
