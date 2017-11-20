/*
import { NgModule, Component, Inject } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MaterialModule,
    MD_DIALOG_DATA,
    MdDialog,
    MdDialogModule,
    MdDialogRef,
    MdInputModule,
} from '@angular/material';

import { NetwitnessDialog } from './appliance-card-netwitness-dialog.component';

@NgModule({
    declarations: [ NetwitnessDialog ],
    entryComponents: [ NetwitnessDialog ],
    exports: [ NetwitnessDialog ],
})
class TestModule { }

describe('NetwitnessDialog', () => {
    let component: NetwitnessDialog;
    let dialog: MdDialog;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule,
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                MaterialModule,
                MdDialogModule,
                MdInputModule,
                ],
            declarations: [
                MD_DIALOG_DATA,
                MdDialogRef,
            ],
            providers: [
                { provide: MD_DIALOG_DATA, useValue: {} },
                { provide: MdDialogRef, useValue: {} }
    ]        })
        .compileComponents();
    }));

    beforeEach(() => {
        dialog = TestBed.get(MdDialog);
        let dialogRef = dialog.open(NetwitnessDialog);
        component = dialogRef.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
*/
