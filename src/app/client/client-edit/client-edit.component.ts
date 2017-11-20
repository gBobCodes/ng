import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import {
    AlertService,
    ClientService,
    MessageService,
    ProfileService,
} from '../../_services/index';
import { ClientInterface } from '../../_interfaces/index';


@Component({
    selector: 'cnx-client-edit',
    templateUrl: './client-edit.component.html',
    styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
    // Display a form for adding and modifying a client.

    @Input() client: ClientInterface;
    @Output() clientChange = new EventEmitter<ClientInterface>();

    @Input() showClientModifyForm: boolean;
    @Output() showClientModifyFormChange = new EventEmitter<boolean>();

    checkboxEnabled: boolean;
    clientForm: FormGroup;

    constructor(
        private alertService: AlertService,
        private clientService: ClientService,
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private profileService: ProfileService,
    ) { }

    changeStatus() {
        // User clicked the Enabled checkbox, swap the field label.
        this.checkboxEnabled = !this.checkboxEnabled;
    }

    ngOnInit() {
        // Create a blank form to add a client.
        this.checkboxEnabled = true;
        this.clientForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            abbr: ['', [Validators.required]],
            pm_id: ['', [Validators.required, Validators.maxLength(4)]],
            enabled: [this.checkboxEnabled, []],
        });

        // Populate form with data from the given client.
        if(this.client) {
            this.checkboxEnabled = this.client.enabled;
            this.clientForm.controls.name.setValue(this.client.name);
            this.clientForm.controls.abbr.setValue(this.client.abbr);
            this.clientForm.controls.pm_id.setValue(this.client.pm_id);
            this.clientForm.controls.enabled.setValue(this.client.enabled);
            this.checkboxEnabled = this.client.enabled;
        }
    }

    onCancel():void {
        // User clicked Cancel button, do not save changes.
        // Emit an event for the parent component to close the form.
        this.clientForm.reset
        this.showClientModifyFormChange.emit(false);
    }

    onSave({value, valid}: {value: ClientInterface, valid: boolean}) {
        // User clicked Save button, save client data.
        if(valid) {
            const errorMsg = 'Failed to save the client. Maybe the name or PM ID already exists.';
            if(this.client) {
                // Save existing client with a PUT to API.
                value['id'] = this.client.id;
                this.clientService.putData(value).subscribe(
                    response => {
                        // Tell the parent component the client changed, close the form.
                        this.clientChange.emit(response);
                        if(this.client.name != response.name) {
                            this.messageService.sendMessage(
                                'refresh client list',
                                undefined
                            );
                        }
                        this.showClientModifyFormChange.emit(false);
                        this.refresh();
                    },
                    error => {
                        this.alertService.error(errorMsg);
                        console.log('Error Message: ' + error);
                    }
                );
            } else {
                // Save new client with a POST to API.
                this.clientService.postData(value).subscribe(
                    response => {
                        // Tell parent component the client was created, close the form.
                        this.messageService.sendMessage(
                            response.id + ':new client created', undefined
                        );
                        this.showClientModifyFormChange.emit(false);
                        this.refresh();
                    },
                    error => {
                        this.alertService.error(errorMsg);
                        console.log('Error Message: ' + error);
                    }
                );
            }
        }
    }

    private refresh() {
        // refresh all affected data
        this.profileService.refreshCurrent();
        this.clientService.refreshAll();
        this.clientService.refreshAvailable();
        this.clientService.refreshSubscribed();
    }

}
