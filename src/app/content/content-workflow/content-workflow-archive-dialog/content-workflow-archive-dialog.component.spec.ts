import { NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MaterialModule,
    MdDialog,
    MdDialogModule,
} from '@angular/material';

import { ArchiveDialog } from './content-workflow-archive-dialog.component';

@NgModule({
    declarations: [ ArchiveDialog ],
    entryComponents: [ ArchiveDialog ],
    exports: [ ArchiveDialog ],
})
class TestModule { }

describe('ArchiveDialog', () => {
    let component: ArchiveDialog;
    let dialog: MdDialog;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule,
                BrowserModule,
                BrowserAnimationsModule,
                MaterialModule,
                MdDialogModule,
                ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        dialog = TestBed.get(MdDialog);
        let dialogRef = dialog.open(ArchiveDialog);
        component = dialogRef.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
