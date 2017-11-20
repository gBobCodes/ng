import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWorkflowComponent } from './content-workflow.component';

describe('ContentWorkflowComponent', () => {
  let component: ContentWorkflowComponent;
  let fixture: ComponentFixture<ContentWorkflowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ContentWorkflowComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentWorkflowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

/*  it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
