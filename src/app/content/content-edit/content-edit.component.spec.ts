import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import {
    MaterialModule,
    MdCheckboxModule,
    MdInputModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    AlertService,
    ArrayService,
    RuleService,
    SettingService,
    UserService,
    ValuelistService
} from '../../_services/index';
import { ContentEditComponent } from './content-edit.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AlertComponent } from '../../_directives/index';

describe('AddContentComponent', () => {
    let component: ContentEditComponent;
    let fixture: ComponentFixture<ContentEditComponent>;
    let valuelistService: ValuelistService;

    beforeAll(() => {
        let testSettings = [
            { "name": "Browser", "id": "Browser" },
            { "name": "Brute", "id": "Brute" }
        ];
        localStorage.setItem('attackphases', JSON.stringify(testSettings));
        localStorage.setItem('platforms', JSON.stringify(testSettings));
        localStorage.setItem('protocols', JSON.stringify(testSettings));
        localStorage.setItem('threatactors', JSON.stringify(testSettings));
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ContentEditComponent, AlertComponent ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                MaterialModule,
                MdCheckboxModule,
                MdInputModule,
                MultiselectDropdownModule,
                ReactiveFormsModule,
                RouterTestingModule,
                HttpModule
                ],
            providers: [
                AlertService,
                ArrayService,
                RuleService,
                SettingService,
                UserService,
                ValuelistService
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('test we`re on the add content page', () =>{
        const header = fixture.debugElement.query(By.css('.cx-sub-header-title'));
        const headerElement = header.nativeElement;

        fixture.detectChanges();
        expect(headerElement.textContent).toBe('Create New Content');
    });

});
