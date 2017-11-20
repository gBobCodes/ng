import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@angular/material';

import { AlertComponent } from '../../_directives/index';
import {
    AlertService,
    DeploymentService,
    DownloadService,
    UserService,    
} from '../../_services/index';

import { ApplianceCardComponent } from './appliance-card.component';

describe('ApplianceCardComponent', () => {
    let component: ApplianceCardComponent;
    let fixture: ComponentFixture<ApplianceCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AlertComponent,
                ApplianceCardComponent
            ],
            imports: [
                BrowserAnimationsModule,
                HttpModule,
                MaterialModule,
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
        fixture = TestBed.createComponent(ApplianceCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should be created', () => {
    //     expect(component).toBeTruthy();
    // });
});