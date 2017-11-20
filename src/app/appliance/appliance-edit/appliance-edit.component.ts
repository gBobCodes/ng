import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    IMultiSelectOption,
    IMultiSelectSettings,
    IMultiSelectTexts
} from 'angular-2-dropdown-multiselect';

import {
    AlertService,
    ApplianceService,
    ArrayService,
    ClientService,
    MessageService,
    UserService,
    ValuelistService,
} from '../../_services/index';
import { ApplianceInterface } from '../../_interfaces/index';

@Component({
    selector: 'cnx-appliance-edit',
    templateUrl: './appliance-edit.component.html',
    styleUrls: ['./appliance-edit.component.scss']
  })
  export class ApplianceEditComponent implements OnInit {
    /*
    Display a form for adding and modifying an appliance.
    */
    @Input() appliance: ApplianceInterface;
    @Output() applianceChange = new EventEmitter<ApplianceInterface>();

    @Input() clientId: number;

    @Input() showApplianceModifyForm: boolean;
    @Output() showApplianceModifyFormChange = new EventEmitter<boolean>();
    
    applianceForm: FormGroup;
    dependenciesAreValid = true;    

    // Dropdown arrays
    custom_inputs = [];
    logs = [];
    packets = [];
    platforms = [];
    dropDownSettings: IMultiSelectSettings = {};
    
    constructor(
        private alertService: AlertService,
        private applianceService: ApplianceService,
        private arrayService: ArrayService,
        private clientService: ClientService,
        private formBuilder: FormBuilder,  
        private messageService: MessageService,
        private userService: UserService,
        private valueListService: ValuelistService,        
    ) { }

    ngOnInit() {
        this.custom_inputs = this.valueListService.get('custominputs');
        this.logs = this.valueListService.get('logs');
        this.packets = this.valueListService.get('packets');
        this.platforms = this.valueListService.get('platforms');

        // Display settings for multiselect dropdowns
        this.dropDownSettings = {
            checkedStyle: 'checkboxes',
            buttonClasses: 'cx-multidropdown',
            containerClasses: 'cx-ms-container',
            itemClasses: 'cx-mulit-window',
            dynamicTitleMaxItems: 1,
            displayAllSelectedText: true
        };
        
        // Create the edit form and fields.
        this.applianceForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            platform: ['', [Validators.required]],
            logs: [''],
            packets: [''],
            custom_inputs: [''],
        });

        // Populate form with existing appliance values.
        if(this.appliance) {
            this.applianceForm.controls.name.setValue(this.appliance.name);
            this.applianceForm.controls.platform.setValue(this.appliance.platform.id);    
        }
    }

    ngDoCheck() {
        /*
        This method is called frequently by ng.
        Update the multi-select values,
            if they have not been touched by the user.
        Putting this code in the ngOnInit() method did not update
        the values, so the code is here.
        */
        if(this.appliance && this.applianceForm) {
            if(!this.applianceForm.controls.logs.touched) {
                this.applianceForm.controls.logs.setValue(
                    this.arrayService.getIds(this.appliance.logs)
                );
            }
            if(!this.applianceForm.controls.packets.touched) {
                this.applianceForm.controls.packets.setValue(
                    this.arrayService.getIds(this.appliance.packets)
                );
            }
            if(!this.applianceForm.controls.custom_inputs.touched) {
                    this.applianceForm.controls.custom_inputs.setValue(
                    this.arrayService.getIds(this.appliance.custom_inputs)
                );
            }
        }
    }

    onCancel() {
        // User clicked Cancel button.
        // Emit an event telling the parent component to close this form.
        this.showApplianceModifyFormChange.emit(false);
    }

    onSave({value, valid}: {value: ApplianceInterface, valid: boolean}) {        
        // User clicked Save button, save appliance data.
        if(valid) {
            const errorMsg = 'Failed to save the appliance. Please try again later.';
            if(this.appliance) {
                // Save existing appliance using PUT to API.
                value['id'] = this.appliance.id;
                value['client'] = this.appliance.client;
                this.applianceService.putData(value).subscribe(
                    response => {
                        this.refreshAppliance(response.id);
                    },
                    error => {
                        this.alertService.error(errorMsg);
                        console.log('Error Message: ' + error);
                    }
                );
            } else {
                // Save new appliance using POST to API.
                value['client'] = this.clientId;
                this.applianceService.postData(value).subscribe(
                    response => {
                        this.showApplianceModifyFormChange.emit(false);
                        this.messageService.sendMessage(
                            'new appliance created',
                            undefined
                        );        
                    },
                    error => {
                        this.alertService.error(errorMsg);
                        console.log('Error Message: ' + error);
                    }
                );
            }
        }
    }

    private refreshAppliance(applianceId: number) {
        // Refresh the appliance from the database by calling the API.
        this.applianceService.get(applianceId).subscribe(
            response => {
                /*
                Get was successful.
                Emit the appliance change event so the detail display will update.
                Emit the form change event to close the form.
                */
                this.appliance = Object.assign(
                    new ApplianceInterface(),
                    response
                );
                this.applianceChange.emit(this.appliance);
                this.showApplianceModifyFormChange.emit(false);
            },
            error => {
                this.alertService.error(
                    'Failed to read the saved appliance. Please try again later.'
                );
                console.log('Error Message: ' + error);
            }
        );
    }

    touch(element: string){
        /*
        'touch' multiselect dropdown element for validation
        Let angular know that this field has been 'touched' so that it can
        re-run the validation on the field and mark is as valid/invalid.
        */
        this.applianceForm.get(element).markAsTouched();
    }

    validateDependencies() {
        /*
        See if user selected at least 1 Log or Packet or Custom dependency.
        If not, display a field error on the form.
        */
        let selectedValues = [this.applianceForm.controls.logs.value];
        selectedValues.push(this.applianceForm.controls.packets.value);
        selectedValues.push(this.applianceForm.controls.custom_inputs.value);
        this.dependenciesAreValid = this.arrayService.hasAtLeastOneValue(selectedValues);
    }

}
