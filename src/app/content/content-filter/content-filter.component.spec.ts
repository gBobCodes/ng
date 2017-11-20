import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
    MaterialModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdInputModule,
    MdNativeDateModule,
} from '@angular/material';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
    AlertService,
    ClientService,
    FilterService,
    StateService,
    UserService,
    ValuelistService,    
} from '../../_services/index';

import { AlertComponent } from '../../_directives/index';
import { ContentFilterComponent } from '../index';

describe('FiltersComponent', () => {
    let component: ContentFilterComponent;
    let fixture: ComponentFixture<ContentFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AlertComponent,
                ContentFilterComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                HttpModule,
                MaterialModule,
                MdCheckboxModule,
                MdDatepickerModule,
                MdInputModule,
                MdNativeDateModule,
                MultiselectDropdownModule,
                ReactiveFormsModule,
                RouterTestingModule,
            ],
            providers: [
                AlertService,
                ClientService,
                FilterService,
                StateService,
                UserService,
                ValuelistService,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

     it('should be created', () => {
         expect(component).toBeTruthy();
     });
});
