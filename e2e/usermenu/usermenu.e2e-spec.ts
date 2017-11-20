import { Login } from '../shared/login';
import { Logout } from '../shared/logout';

import { UserMenu } from './usermenu.elements';


describe('Login View User Menu for Each Group User:', function() {
	// login as different group user and check 5 User Menu items displayed correctly for them
	// Only 'Admin' user can view the 'Administration' item, others only see the other 4 items

    let usermenu: UserMenu;
    usermenu = new UserMenu();

    let login: Login;
    login = new Login();

    let logout: Logout;
    logout = new Logout();

    afterEach(() => {
        usermenu.closeUserMenu();
        logout.performLogout();
    });
    
    it("View User Menu as Admin Group User", () => {
    	login.performLogin("admin", "conex.admin");
        usermenu.openUserMenu();

        expect(usermenu.adminLink().isPresent()).toBe(true);
        expect(usermenu.clientSubscriptionsLink().isPresent()).toBe(true);
        expect(usermenu.myAccountLink().isPresent()).toBe(true);
        expect(usermenu.signOutLink().isPresent()).toBe(true);
    });

    it("View User Menu as Author Group User", () => {
    	login.performLogin("author", "conex.author");
        usermenu.openUserMenu();

        expect(usermenu.adminLink().isPresent()).toBe(false);
        expect(usermenu.clientSubscriptionsLink().isPresent()).toBe(true);
        expect(usermenu.myAccountLink().isPresent()).toBe(true);
        expect(usermenu.signOutLink().isPresent()).toBe(true);
    });

    it("View User Menu as Engineer Group User", () => {
    	login.performLogin("engineer", "conex.engineer");
        usermenu.openUserMenu();

        expect(usermenu.adminLink().isPresent()).toBe(false);
        expect(usermenu.clientSubscriptionsLink().isPresent()).toBe(true);
        expect(usermenu.myAccountLink().isPresent()).toBe(true);
        expect(usermenu.signOutLink().isPresent()).toBe(true);
      });

    it("View User Menu as Liaison Group User", () => {
    	login.performLogin("liaison", "conex.liaison");
        usermenu.openUserMenu();

        expect(usermenu.adminLink().isPresent()).toBe(false);
        expect(usermenu.clientSubscriptionsLink().isPresent()).toBe(true);
        expect(usermenu.myAccountLink().isPresent()).toBe(true);
        expect(usermenu.signOutLink().isPresent()).toBe(true);
    });

    it("View User Menu as QA Group User", () => {
    	login.performLogin("qa", "conex.qa");
        usermenu.openUserMenu();

        expect(usermenu.adminLink().isPresent()).toBe(false);
        expect(usermenu.clientSubscriptionsLink().isPresent()).toBe(true);
        expect(usermenu.myAccountLink().isPresent()).toBe(true);
        expect(usermenu.signOutLink().isPresent()).toBe(true);
    });

    it("View User Menu as SME Group User", () => {
    	login.performLogin("sme", "conex.sme");
        usermenu.openUserMenu();

        expect(usermenu.adminLink().isPresent()).toBe(false);
        expect(usermenu.clientSubscriptionsLink().isPresent()).toBe(true);
        expect(usermenu.myAccountLink().isPresent()).toBe(true);
        expect(usermenu.signOutLink().isPresent()).toBe(true);
    });

    it("View User Menu as Readonly Group User", () => {
    	login.performLogin("readonly", "conex.readonly");
        usermenu.openUserMenu();

        expect(usermenu.adminLink().isPresent()).toBe(false);
        expect(usermenu.clientSubscriptionsLink().isPresent()).toBe(false);
        expect(usermenu.myAccountLink().isPresent()).toBe(true);
        expect(usermenu.signOutLink().isPresent()).toBe(true);
    });
})