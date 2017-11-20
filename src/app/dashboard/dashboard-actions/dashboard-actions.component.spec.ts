/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService, UserService } from '../../_services/index';
import { ContentCardComponent } from '../../content/index';
import { DashboardActionsComponent } from '../index';

describe('DashboardActionsComponent', () => {
    let component: DashboardActionsComponent;
    let fixture: ComponentFixture<DashboardActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContentCardComponent,
                DashboardActionsComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                HttpModule,
                MaterialModule,
                RouterTestingModule
            ],
            providers: [ AlertService, UserService, ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
