import { Component, OnInit } from '@angular/core';
import {
    IMultiSelectOption,
    IMultiSelectSettings,
    IMultiSelectTexts
} from 'angular-2-dropdown-multiselect';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import {
    AlertService,
    ClientService,
    FilterService,
    StateService,
    ValuelistService,
} from '../../_services/index';
import { FilterInterface } from '../../_interfaces/index';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'cnx-filters',
  templateUrl: './content-filter.component.html',
  styleUrls: ['./content-filter.component.scss']
})
export class ContentFilterComponent implements OnInit {
    dropDownSettings: IMultiSelectSettings = {};
    filterForm: FormGroup;

    clients;
    custom_inputs = [];
    logs = [];
    packets = [];
    attack_phases = [];
    platform = [];
    protocol = [];
    state;
    threat_actor = [];
    threat_categories = [];

    constructor(
        private alertService: AlertService,
        private clientService: ClientService,
        private filterService: FilterService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private stateService: StateService,
        private valueListService: ValuelistService,
    ) {
    }

    ngOnInit() {
        this.custom_inputs = this.valueListService.get('custominputs');
        this.logs = this.valueListService.get('logs');
        this.packets = this.valueListService.get('packets');
        this.attack_phases = this.valueListService.get('attackphases');
        this.platform = this.valueListService.get('platforms');
        this.protocol = this.valueListService.get('protocols');
        this.stateService.getRuleStates().subscribe(
            response => {
                this.state = response
            },
            error => {
                this.alertService.error('Failed to get the states. Please try again later.');
                console.log('Error Message: ' + error);
            }
        );
        this.threat_actor = this.valueListService.get('threatactors');
        this.threat_categories = this.valueListService.get('threatcategories');

        // Display settings for multiselect dropdowns
        this.dropDownSettings = {
            checkedStyle: 'checkboxes',
            buttonClasses: 'cx-multidropdown',
            containerClasses: 'cx-ms-container',
            itemClasses: 'cx-mulit-window',
            dynamicTitleMaxItems: 3,
            displayAllSelectedText: true
        };
        // Create the reactive form with default (blank) values
        this.clients = this.clientService.all();
        var today = new Date()
        this.filterForm = this.formBuilder.group({
            attack_phases: [],
            client: [],
            custom_inputs: [],
            logs: [],
            packets: [],
            platform: [],
            protocol: [],
            threat_actor: [],
            threat_categories: [],
            search: '',
            state: [],
            created_date_start: new Date().setDate(today.getDate()-30),
            created_date_end: today,
        })
        let search_text = this.route.snapshot.queryParams['search']
        if (search_text) {
            this.filterForm.controls.search.setValue(search_text);
        }
    }

    onSubmit({value, valid}: {value: FilterInterface, valid: boolean}) {
        this.filterService.getData(value);
    }
}
