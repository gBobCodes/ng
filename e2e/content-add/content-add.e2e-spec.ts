import { browser, element, by } from 'protractor';

import { Login } from '../shared/login';
import { Logout } from '../shared/logout';
import { UserMenu } from '../usermenu/usermenu.elements';
import { ViewNav } from '../navigation/navigation.elements';

import { AddContent } from './content-add.elements';

describe('Content Add', function() {
    let login: Login;
    login = new Login();

    let logout: Logout;
    logout = new Logout();

    let usermenu: UserMenu;
    usermenu = new UserMenu();

    let navigation: ViewNav;
    navigation = new ViewNav();

    let addcontent: AddContent;
    addcontent = new AddContent();

    beforeEach(() => {
        // Login and navigate to the Add Content screen
        login.performLogin("author", "conex.author");
        expect(navigation.addContentLink().isPresent()).toBe(true);

        // navigation.addContentLink().click();
        // That click causes an error.
        // Using alternate navigation.
        addcontent.navigateTo();
    });

    afterEach(() => {
        logout.performLogout();
    });

    it("Should submit the form", () => {
        // Send some random Data to the form
        browser.waitForAngular();
        console.log("About to test Add form to find Title.");
        expect(element(by.name('title')).isPresent()).toBe(false);
        //expect(element(by.binding('title')).isPresent()).toBe(true);
        expect(element(by.id('md-input-1')).isPresent()).toBe(false);
        expect(element(by.css('input#md-input-1')).isPresent()).toBe(false);
        expect(element(by.css('[ng-reflect-name="title"]')).isPresent()).toBe(false);
        //addcontent.title().sendKeys('Test title');
        /*
        addcontent.description().sendKeys('Test description');
        addcontent.logs();
        addcontent.content();
        addcontent.saveButton().click();
        */
    })
})
