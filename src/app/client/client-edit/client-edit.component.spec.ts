import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    ProfileService,
    UserService,
    ValuelistService,    
} from '../../_services/index';

import { AlertComponent } from '../../_directives/index';
import { ApplianceDetailComponent, ApplianceEditComponent } from '../../appliance/index';
import { ClientDetailComponent, ClientEditComponent } from '../index';

describe('ClientEditComponent', () => {
    let component: ClientEditComponent;
    let fixture: ComponentFixture<ClientEditComponent>;

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
                BrowserAnimationsModule,
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
                ProfileService,
                UserService,
                ValuelistService,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
