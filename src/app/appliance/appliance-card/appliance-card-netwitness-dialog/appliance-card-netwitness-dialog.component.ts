import { Component, Inject, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'appliance-card-netwitness-dialog',
    templateUrl: './appliance-card-netwitness-dialog.component.html',
    styleUrls: ['./appliance-card-netwitness-dialog.component.scss']
})

export class NetwitnessDialog {
    constructor(
        public dialogRef: MdDialogRef<NetwitnessDialog>,
        @Optional() @Inject(MD_DIALOG_DATA) public data: any
    ) { }

}