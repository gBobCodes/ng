import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AlertService, RuleService, UserService } from '../../_services/index';
import { ContentInterface } from '../../_interfaces/index';

import { ContentViewComponent } from './content-view.component';

describe('ContentViewComponent', () => {
    let component: ContentViewComponent;
    let fixture: ComponentFixture<ContentViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ContentViewComponent ],
            imports: [ ContentInterface ],
            providers: [ AlertService, ActivatedRoute, RuleService, UserService ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

/*    it('should be created', () => {
        expect(component).toBeTruthy();
    });*/
});
