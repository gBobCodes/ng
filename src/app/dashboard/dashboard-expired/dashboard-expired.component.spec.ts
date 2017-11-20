/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService, FilterService, RuleService, UserService } from '../../_services/index';
import { ApplianceCardComponent } from '../../appliance/index';
import { ContentCardComponent } from '../../content/index';
import { DashboardExpiredComponent } from '../index';

describe('DashboardExpiredComponent', () => {
    let component: DashboardExpiredComponent;
    let fixture: ComponentFixture<DashboardExpiredComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplianceCardComponent,
                ContentCardComponent,
                DashboardExpiredComponent,
            ],
            imports: [
                HttpModule,
                MaterialModule,
                RouterTestingModule
            ],
            providers: [ AlertService, FilterService, RuleService, UserService, ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardExpiredComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
