import { Login } from '../shared/login';
import { Logout } from '../shared/logout';

import { ViewNav } from './navigation.elements';


describe('Login View Navigatin Menu for Each Group User:', function() {
	// login as different group user and check 5 Nav Menu items displayed correctly for them
	// Only 'Author' can view the 'Add Content' item, others only see the other 4 items

    let view: ViewNav;
    view = new ViewNav();

    let login: Login;
    login = new Login();

    let logout: Logout;
    logout = new Logout();

    it("View Navagiation Menu as Admin Group User", () => {
    	login.performLogin("admin", "conex.admin");

        expect(view.dashboardLink().getText()).toBe("My Dashboard");
        expect(view.addContentLink().isPresent()).toBe(false);
        expect(view.clientsLink().getText()).toBe("Clients");
        expect(view.searchLink().getText()).toBe("Search");
        expect(view.searchText().isPresent()).toBe(true);

        logout.performLogout();
    });

    it("View Navagiation Menu as Author Group User", () => {
    	login.performLogin("author", "conex.author");

        expect(view.dashboardLink().getText()).toBe("My Dashboard");
        expect(view.addContentLink().getText()).toBe("Add Content");
        expect(view.clientsLink().getText()).toBe("Clients");
        expect(view.searchLink().getText()).toBe("Search");
        expect(view.searchText().isPresent()).toBe(true);

        logout.performLogout();
    });

    it("View Navagiation Menu as Engineer Group User", () => {
    	login.performLogin("engineer", "conex.engineer");

        expect(view.dashboardLink().getText()).toBe("My Dashboard");
        expect(view.addContentLink().isPresent()).toBe(false);
        expect(view.clientsLink().getText()).toBe("Clients");
        expect(view.searchLink().getText()).toBe("Search");
        expect(view.searchText().isPresent()).toBe(true);

        logout.performLogout();
    });

    it("View Navagiation Menu as Liaison Group User", () => {
    	login.performLogin("liaison", "conex.liaison");

        expect(view.dashboardLink().getText()).toBe("My Dashboard");
        expect(view.addContentLink().isPresent()).toBe(false);
        expect(view.clientsLink().getText()).toBe("Clients");
        expect(view.searchLink().getText()).toBe("Search");
        expect(view.searchText().isPresent()).toBe(true);

        logout.performLogout();
    });

    it("View Navagiation Menu as QA Group User", () => {
    	login.performLogin("qa", "conex.qa");

        expect(view.dashboardLink().getText()).toBe("My Dashboard");
        expect(view.addContentLink().isPresent()).toBe(false);
        expect(view.clientsLink().getText()).toBe("Clients");
        expect(view.searchLink().getText()).toBe("Search");
        expect(view.searchText().isPresent()).toBe(true);

        logout.performLogout();
    });

    it("View Navagiation Menu as SME Group User", () => {
    	login.performLogin("sme", "conex.sme");

        expect(view.dashboardLink().getText()).toBe("My Dashboard");
        expect(view.addContentLink().isPresent()).toBe(false);
        expect(view.clientsLink().getText()).toBe("Clients");
        expect(view.searchLink().getText()).toBe("Search");
        expect(view.searchText().isPresent()).toBe(true);

        logout.performLogout();
    });

    it("View Navagiation Menu as Readonly Group User", () => {
    	login.performLogin("readonly", "conex.readonly");

        expect(view.dashboardLink().getText()).toBe("My Dashboard");
        expect(view.addContentLink().isPresent()).toBe(false);
        expect(view.clientsLink().getText()).toBe("Clients");
        expect(view.searchLink().getText()).toBe("Search");
        expect(view.searchText().isPresent()).toBe(true);

        logout.performLogout();
    });
})

