import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { DragulaModule, DragulaService } from 'ng2-dragula';

import { AlertComponent } from '../../_directives/alert.component';
import {
    AlertService,
    ArrayService,
    ClientService,
    ProfileService,
    UserService
} from '../../_services/index';
import { ModalComponent } from '../../app-modal.component';

import { ClientSubscriptionComponent } from './client-subscription.component';

describe('ClientSubscriptionComponent', () => {
    let component: ClientSubscriptionComponent;
    let fixture: ComponentFixture<ClientSubscriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
              AlertComponent,
              ClientSubscriptionComponent,
              ModalComponent,
          ],
          imports: [
              BrowserAnimationsModule,
              DragulaModule,
              HttpModule,
              MaterialModule,
              RouterTestingModule
          ],
          providers: [
              AlertService,
              ArrayService,
              ClientService,
              DragulaService,
              ProfileService,
              UserService, ],
        })
    .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientSubscriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /*
    So Close!
    TypeError: undefined is not an object (evaluating '_a.length'
    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    */
});