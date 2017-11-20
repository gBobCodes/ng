/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService, RuleService, UserService } from '../../_services/index';
import { ContentCardComponent } from '../../content/index';
import { DashboardDevelopmentComponent } from '../index';

describe('DashboardDevelopmentComponent', () => {
    let component: DashboardDevelopmentComponent;
    let fixture: ComponentFixture<DashboardDevelopmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContentCardComponent,
                DashboardDevelopmentComponent,
            ],
            imports: [
                HttpModule,
                MaterialModule,
                RouterTestingModule,
            ],
            providers: [ AlertService, RuleService, UserService, ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardDevelopmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
