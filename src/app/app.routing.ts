import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import {
    AdminGuard,
    AuthGuard,
    AuthorGuard,
    ClientGuard,
} from './_guards/index';
import {
    AccountEdit,
    AccountList,
} from './account/index';
import { AdminListComponent } from './admin/index';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import {
    ClientDetailComponent,
    ClientSubscriptionComponent,
    ClientViewComponent
} from './client/index';
import {
    ContentEditComponent,
    ContentSearchComponent,
    ContentViewComponent,
} from './content/index';
import { DashboardViewComponent } from './dashboard/index';
import { DeploymentViewComponent } from './deployment/index';

function makeURL(input: string[]): string {
    // Take an array of strings, prefix each with a slash, return a URL.
    // Example: the input ['content', 'edit'] becomes '/content/edit'
    let url = '';
    input.forEach(function(item) {
        url += slash + item;
    });
    return url;
}

/* -- READ ME --
How to define a route.
There are 4 steps for creating routes.
1. Determine the URL that will appear in the browser.
    Example: /client/add
2. Define constants for the words in the URL.
    Example: const client = 'client';
3. Add the name of the route to the routeNames object.
    Example: clientAdd: makeURL([client, add]),
4. Define the route in the appRoutes array.
*/


// Constants to help define the routes and their names
const accounts = 'accounts';
const add = 'add';
const administration = 'administration';
const clients = 'clients';
const content = 'content';
const dashboard = 'dashboard';
const deployment = 'deployment';
const edit = 'edit';
const id = ':id';
const search = 'search';
const slash = '/';
const subscriptions = 'subscriptions';
const view = 'view';

/*
Use these definitions in the components to redirect the user
For example:
import { routeNames } from '../../app.routing';
import { SearchComponent } from './search/search.component';
this.router.navigate([routeNames.contentEdit, this.content.id]);
*/
export const routeNames = {
    admin: makeURL([administration]),
    adminAccounts: makeURL([administration, accounts]),
    clients: makeURL([clients]),
    contentAdd: makeURL([content, add]),
    contentEdit: makeURL([content, edit]),
    contentView: makeURL([content, view]),
    dashboard: makeURL([dashboard]),
    deployment: makeURL([deployment]),
}

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: administration, component: AdminmenuComponent,
                children: [
                    { path: '', redirectTo: accounts, pathMatch: 'full' },
                    { path: accounts, component: AccountList,
                        children: [
                            {
                                path: edit + slash + id,
                                component: AccountEdit,
                                outlet: 'modaloutlet',
                            },
                        ]
                    },
                    {
                        path: id,
                        component: AdminListComponent,
                    },
                ],
                canActivate: [AdminGuard],
            },
            {
                path: clients,
                component: ClientViewComponent,
                children: [
                    {
                        path: id,
                        component: ClientDetailComponent,
                    },
                    {
                        path: subscriptions,
                        component: ClientSubscriptionComponent,
                        outlet: 'subscriptionoutlet',
                    },
                ],
                canActivate: [ClientGuard],
            },
            {
                path: content,
                children: [
                    {
                        path: '',
                        redirectTo: add,
                        pathMatch: 'full',
                    },
                    {
                        path: add,
                        component: ContentEditComponent,
                        canActivate: [AuthorGuard],
                    },
                    {
                        path: edit + slash + id,
                        component: ContentEditComponent,
                    },
                    {
                        path: view + slash + id,
                        component: ContentViewComponent,
                    }
                ]
            },
            {
                path: dashboard,
                component: DashboardViewComponent,
            },
            {
                path: deployment + slash + id,
                component: DeploymentViewComponent,
            },
            {
                path: search,
                component: ContentSearchComponent
            }
        ]
    },

    {
        path: 'login', component: LoginComponent
    },
    // otherwise redirect to home
    {
        path: '**', redirectTo: ''
    }
];

export const routing = RouterModule.forRoot(appRoutes);
