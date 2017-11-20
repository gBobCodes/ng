import { NgModule } from '@angular/core';
import {
    MaterialModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdDialogModule,
    MdInputModule,
    MdMenuModule,
    MdNativeDateModule,
    MdProgressSpinnerModule,
    MdTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives/index';
import {
    AdminGuard,
    AuthGuard,
    AuthorGuard,
    ClientGuard
} from './_guards/index';
import {
    AdminDetailComponent,
    AdminListComponent,
} from './admin/index';
import {
    AdminService,
    AlertService,
    ApplianceService,
    ArrayService,
    AuthenticationService,
    ClientService,
    CommentService,
    DeploymentService,
    DownloadService,
    FilterService,
    MessageService,
    ProfileService,
    RuleService,
    SettingService,
    StateService,
    UserService,
    ValuelistService,
} from './_services/index';
import {
    AccountEdit,
    AccountList,
} from './account/index';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import {
    ApplianceCardComponent,
    ApplianceDetailComponent,
    ApplianceEditComponent,
} from './appliance/index';
import { NetwitnessDialog } from './appliance/appliance-card/appliance-card-netwitness-dialog/appliance-card-netwitness-dialog.component';
import {
    ClientDetailComponent,
    ClientEditComponent,
    ClientListComponent,
    ClientSubscriptionComponent,
    ClientViewComponent,
} from './client/index';
import { ArchiveDialog } from './content/content-workflow/content-workflow-archive-dialog/content-workflow-archive-dialog.component';
import { DeclineComment } from './content/content-workflow/content-workflow-decline-comment/content-workflow-decline-comment.component'
import {
    ContentActionsComponent,
    ContentCardComponent,
    CommentsComponent,
    ContentDetailComponent,
    ContentEditComponent,
    ContentFilterComponent,
    ContentSearchComponent,
    ContentViewComponent,
    ContentWorkflowComponent,
} from './content/index';
import {
    DashboardActionsComponent,
    DashboardDeployComponent,
    DashboardDevelopmentComponent,
    DashboardExpiredComponent,
    DashboardMenuComponent,
    DashboardRecallComponent,
    DashboardViewComponent
} from './dashboard/index';
import {
    DeploymentDetailComponent,
    DeploymentViewComponent,
    DeploymentWorkflowComponent,
} from './deployment/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { ModalComponent } from './app-modal.component';
import { SearchComponent } from './search/search.component';
import { UsermenuComponent } from './usermenu/usermenu.component';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
        DragulaModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdDatepickerModule,
        MdDialogModule,
        MdInputModule,
        MdMenuModule,
        MdNativeDateModule,
        MdProgressSpinnerModule,
        MdTooltipModule,
        ReactiveFormsModule,
        MultiselectDropdownModule,
        routing,
    ],
    declarations: [
        AccountEdit,
        AccountList,
        AdminDetailComponent,
        AdminListComponent,
        AdminmenuComponent,
        ApplianceCardComponent,
        ArchiveDialog,
        AlertComponent,
        AppComponent,
        ApplianceDetailComponent,
        ApplianceEditComponent,
        ArchiveDialog,
        DeclineComment,
        ClientDetailComponent,
        ClientEditComponent,
        ClientListComponent,
        ClientSubscriptionComponent,
        ClientViewComponent,
        CommentsComponent,
        ContentActionsComponent,
        ContentCardComponent,
        ContentDetailComponent,
        ContentEditComponent,
        ContentFilterComponent,
        ContentSearchComponent,
        ContentViewComponent,
        ContentWorkflowComponent,
        DashboardActionsComponent,
        DashboardDeployComponent,
        DashboardDevelopmentComponent,
        DashboardExpiredComponent,
        DashboardMenuComponent,
        DashboardRecallComponent,
        DashboardViewComponent,
        DeploymentDetailComponent,
        DeploymentViewComponent,
        DeploymentWorkflowComponent,
        HomeComponent,
        LoginComponent,
        ModalComponent,
        NetwitnessDialog,
        SearchComponent,
        UsermenuComponent,
    ],
    providers: [
        AdminGuard,
        AdminService,
        AlertService,
        ApplianceService,
        ArrayService,
        AuthenticationService,
        AuthGuard,
        AuthorGuard,
        ClientGuard,
        ClientService,
        CommentService,
        DeploymentService,
        DownloadService,
        FilterService,
        MessageService,
        ProfileService,
        RuleService,
        SettingService,
        StateService,
        UserService,
        ValuelistService,
    ],
    entryComponents: [
        ArchiveDialog,
        DeclineComment,
        NetwitnessDialog,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
