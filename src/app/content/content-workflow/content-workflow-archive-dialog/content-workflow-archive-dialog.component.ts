import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './content-workflow-archive-dialog.component.html'
})

export class ArchiveDialog {
  constructor(public dialogRef: MdDialogRef<ArchiveDialog>) {}
}