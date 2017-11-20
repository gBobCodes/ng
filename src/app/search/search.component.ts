import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { FilterInterface } from '../_interfaces/index';
import { FilterService } from '../_services/index';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {

    constructor(
        private filterService: FilterService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    filterForm: FormGroup;
    ngOnInit() {
        this.filterForm = this.formBuilder.group({
            search: '',
        })
    }

    onSubmit({value, valid}: {value: FilterInterface, valid: boolean}) {
        this.router.navigate(['/search'], {
            queryParams: { search: value.search },
            skipLocationChange: true
        });
        this.filterService.getData(value);
    }
}
