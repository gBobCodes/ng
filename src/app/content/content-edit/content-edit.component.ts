import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    IMultiSelectOption,
    IMultiSelectSettings,
    IMultiSelectTexts
} from 'angular-2-dropdown-multiselect';

import { ContentInterface } from '../../_interfaces/index';
import {
    AlertService,
    ArrayService,
    RuleService,
    UserService,
    SettingService,
    ValuelistService
} from '../../_services/index';
import { routeNames } from '../../app.routing';

@Component({
    selector: 'cnx-content-edit',
    templateUrl: './content-edit.component.html',
    styleUrls: ['../content.scss']
})
export class ContentEditComponent implements OnInit {
    /*
    This component is used for both adding new content
    and updating existing content.
    The default settings are for adding new content.
    Properties are updated after the API call, when updating existing content.
    */
    constructor(
        private alertService: AlertService,
        private arrayService: ArrayService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private ruleService: RuleService,
        private userService: UserService,
        private valueListService: ValuelistService,
        private settingService: SettingService,
    ) {
        this.getContent();
    }

    // Text displays for the user
    pageTitle = "Create New Content";
    permissionError = 'Your account does not have permission to update content.';

    // Data interface and reactive form
    content: ContentInterface;
    contentForm: FormGroup;

    // Booleans to control the UI display
    dependenciesAreValid = true;
    modifyMode = false;
    errorFree = true;

    // Dropdown arrays
    authors = [];
    custom_inputs = [];
    logs = [];
    packets = [];
    attack_phases = [];
    platforms = [];
    protocols = [];
    threat_actor = [];
    threat_categories = [];
    dropDownSettings: IMultiSelectSettings = {};

    ngOnInit() {
        const expiration_days = this.settingService.get('RULE_EXPIRATION_DAYS');
        this.custom_inputs = this.valueListService.get('custominputs');
        this.logs = this.valueListService.get('logs');
        this.packets = this.valueListService.get('packets');
        this.attack_phases = this.valueListService.get('attackphases');
        this.platforms = this.valueListService.get('platforms');
        this.protocols = this.valueListService.get('protocols');
        this.threat_actor = this.valueListService.get('threatactors');
        this.threat_categories = this.valueListService.get('threatcategories');

        // Display settings for multiselect dropdowns
        this.dropDownSettings = {
            checkedStyle: 'checkboxes',
            buttonClasses: 'cx-multidropdown',
            containerClasses: 'cx-ms-container',
            itemClasses: 'cx-mulit-window',
            dynamicTitleMaxItems: 1,
            displayAllSelectedText: true
        };

        // Create the reactive form with default (blank) values
        this.contentForm = this.formBuilder.group({
            attack_phases: ['', [Validators.required]],
            author: [''],
            client_customization: [false],
            content: ['', [Validators.required]],
            content_source: [''],
            custom_inputs: [''],
            cve: [''],
            description: ['', [Validators.required]],
            expiration_days: [
                expiration_days,
                [
                    Validators.required,
                    Validators.min(7),
                    Validators.max(365),
                ]
            ],
            id: 0,
            logs: [''],
            malware_family_name: [''],
            malware_family_variant: [''],
            packets: [''],
            platform: [this.platforms[0].id],
            protocol: [this.protocols[0].id],
            references: [''],
            sample: [''],
            threat_actor: [this.threat_actor[0].id, [Validators.required]],
            threat_actor_name: [''],
            threat_categories: ['', [Validators.required]],
            title: ['', [Validators.required]],
            zero_day: [false],
        })
    }

    private getContent(): void {
        // Get content data, if the 'id' param is given in the url.
        this.route.params.subscribe(
            params => {
                const contentId = + params['id'];
                if(contentId) {
                    this.ruleService.loadRuleObject(contentId).subscribe(
                        data => {
                            this.content = Object.assign(
                                new ContentInterface(),
                                data
                            );
                            if(this.content.canUserModify()) {
                                this.setFormValues();
                            } else {
                                this.alertService.error(this.permissionError);
                                this.errorFree = false;
                            }
                        },
                        error => {
                            this.alertService.error(error);
                            this.errorFree = false;
                        }
                    );
                };
            },
        );
    }

    onSubmit({value, valid}: {value: ContentInterface, valid: boolean}) {
        // Save content, redirect to the view url after success
        if(this.modifyMode) {
            this.ruleService.saveRule(value, routeNames.contentView);
        } else {
            value.author = this.userService.getCurrent().id;
            this.ruleService.createNewRule(value, routeNames.contentView);
        }
    }

    setFormValues() {
        // Set the form values after the API returns content data.
        this.modifyMode = true;
        this.pageTitle = 'Modify Content';

        this.userService.getAll().subscribe(
            data => {
                this.authors = this.userService.filterByGroup(data, 'Author');
                this.contentForm.controls.author.setValue(this.content.author.id);
            }
        );
        this.contentForm.controls.attack_phases.setValue(this.arrayService.getIds(this.content.attack_phases));
        this.contentForm.controls.client_customization.setValue(this.content.client_customization);
        this.contentForm.controls.content.setValue(this.content.content);
        this.contentForm.controls.content_source.setValue(this.content.content_source);
        this.contentForm.controls.custom_inputs.setValue(this.arrayService.getIds(this.content.custom_inputs));
        this.contentForm.controls.cve.setValue(this.content.cve);
        this.contentForm.controls.description.setValue(this.content.description);
        this.contentForm.controls.expiration_days.setValue(this.content.expiration_days);
        this.contentForm.controls.id.setValue(this.content.id);
        this.contentForm.controls.logs.setValue(this.arrayService.getIds(this.content.logs));
        this.contentForm.controls.malware_family_name.setValue(this.content.malware_family_name);
        this.contentForm.controls.malware_family_variant.setValue(this.content.malware_family_variant);
        this.contentForm.controls.packets.setValue(this.arrayService.getIds(this.content.packets));
        if (this.content.platform) {
            this.contentForm.controls.platform.setValue(this.content.platform.id);
        } else {
            this.contentForm.controls.platform.setValue(this.platforms[0].id);
        }
        this.contentForm.controls.protocol.setValue(this.content.protocol.id);
        this.contentForm.controls.references.setValue(this.content.references);
        this.contentForm.controls.sample.setValue(this.content.sample);
        this.contentForm.controls.threat_actor.setValue(this.content.threat_actor.id);
        this.contentForm.controls.threat_actor_name.setValue(this.content.threat_actor_name);
        this.contentForm.controls.threat_categories.setValue(this.arrayService.getIds(this.content.threat_categories));
        this.contentForm.controls.title.setValue(this.content.title);
        this.contentForm.controls.zero_day.setValue(this.content.zero_day);
    }

    touch(element: string){
        /*
        'touch' multiselect dropdown element for validation
        Let angular know that this field has been 'touched' so that it can
        re-run the validation on the field and mark is as valid/invalid.
        */
        this.contentForm.get(element).markAsTouched();
    }

    validateDependencies() {
        /*
        See if user selected at least 1 Log or Packet or Custom dependency.
        If not, display a field error on the form.
        */
        let selectedValues = [this.contentForm.controls.logs.value];
        selectedValues.push(this.contentForm.controls.packets.value);
        selectedValues.push(this.contentForm.controls.custom_inputs.value);
        this.dependenciesAreValid = this.arrayService.hasAtLeastOneValue(selectedValues);
    }

}
