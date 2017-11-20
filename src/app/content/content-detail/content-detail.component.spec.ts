import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AlertService, RuleService, UserService } from '../../_services/index';
import { ContentInterface } from '../../_interfaces/index';

import { ContentDetailComponent } from './content-detail.component';

describe('ContentDetailComponent', () => {
    let component: ContentDetailComponent;
    let fixture: ComponentFixture<ContentDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ContentDetailComponent ],
            imports: [ ContentInterface ],
            providers: [ AlertService, ActivatedRoute, RuleService, UserService ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

/*    it('should be created', () => {
        expect(component).toBeTruthy();
    });*/
});
