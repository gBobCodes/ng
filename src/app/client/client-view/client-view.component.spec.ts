import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
    MaterialModule,
    MdCheckboxModule,
    MdInputModule,
} from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import {
    AlertService,
    ClientService,
    MessageService,
    UserService,
} from '../../_services/index';

import { AlertComponent } from '../../_directives/index';
import { ClientViewComponent } from './client-view.component';
import { ClientEditComponent, ClientListComponent } from '../index';

describe('ClientViewComponent', () => {
    let component: ClientViewComponent;
    let fixture: ComponentFixture<ClientViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AlertComponent,
                ClientEditComponent,
                ClientListComponent,
                ClientViewComponent,
            ],
            imports: [
                HttpModule,
                MaterialModule,
                MdCheckboxModule,
                MdInputModule,
                ReactiveFormsModule,
                RouterTestingModule,
            ],
            providers: [
                AlertService,
                ClientService,
                MessageService,
                UserService,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /*
    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    */

});
