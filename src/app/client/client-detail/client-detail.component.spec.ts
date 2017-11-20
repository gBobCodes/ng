import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
    MaterialModule,
    MdCheckboxModule,
    MdInputModule,
} from '@angular/material';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
    AlertService,
    ClientService,
    MessageService,
    UserService,
    ValuelistService,    
} from '../../_services/index';

import { AlertComponent } from '../../_directives/index';
import { ApplianceDetailComponent, ApplianceEditComponent } from '../../appliance/index';
import { ClientDetailComponent } from './client-detail.component';
import { ClientEditComponent } from '../index';

describe('ClientDetailComponent', () => {
    let component: ClientDetailComponent;
    let fixture: ComponentFixture<ClientDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AlertComponent,
                ApplianceDetailComponent,
                ApplianceEditComponent,
                ClientDetailComponent,
                ClientEditComponent,
            ],
            imports: [
                HttpModule,
                MaterialModule,
                MdCheckboxModule,
                MdInputModule,
                MultiselectDropdownModule,
                ReactiveFormsModule,
                RouterTestingModule,
            ],
            providers: [
                AlertService,
                ClientService,
                MessageService,
                UserService,
                ValuelistService,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
