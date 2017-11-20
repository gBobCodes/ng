import { Login } from '../shared/login';
import { Logout } from '../shared/logout';
import { UserMenu } from '../usermenu/usermenu.elements'
import { Admin } from './admin.elements';


describe('Admin Tests', function() {
	// login as Admin group user and click User Menu to select Admin item
	// Check the  Left Panel 9 items

    let admin: Admin;
    admin = new Admin();

    let usermenu: UserMenu;
    usermenu = new UserMenu();

    let login: Login;
    login = new Login();

    let logout: Logout;
    logout = new Logout();

    afterEach(() => {
        logout.performLogout();
    })

    it("View Admin Account Page Components as Admin Group User", () => {
    	login.performLogin("admin", "conex.admin");
        usermenu.openUserMenu();
        admin.selectAdmin();

        expect(admin.accountsLink().isPresent()).toBe(true);
        expect(admin.customLink().isPresent()).toBe(true);
        expect(admin.logsLink().isPresent()).toBe(true);
        expect(admin.packetsLink().isPresent()).toBe(true);
        expect(admin.phasesLink().isPresent()).toBe(true);
        expect(admin.platformsLink().isPresent()).toBe(true);
        expect(admin.protocolsLink().isPresent()).toBe(true);
        expect(admin.settingsLink().isPresent()).toBe(true);
        expect(admin.threatActorsLink().isPresent()).toBe(true);
        expect(admin.threatCategoriesLink().isPresent()).toBe(true);
    });

    it("Custom dependencies", () => {
    	login.performLogin("admin", "conex.admin");
        usermenu.openUserMenu();
        admin.selectAdmin();

        admin.customLink().click();
        expect(admin.title().getText()).toBe("Custom inputs");
        admin.objectCard().click();
        expect(admin.objectEdit().isPresent()).toBe(true);
        expect(admin.objectName().getAttribute('value')).toBe("Definition VIP/HVT")
    });

    it("Log dependencies", () => {
    	login.performLogin("admin", "conex.admin");
        usermenu.openUserMenu();
        admin.selectAdmin();

        admin.logsLink().click();
        expect(admin.title().getText()).toBe("Logs");
        admin.objectCard().click();
        expect(admin.objectEdit().isPresent()).toBe(true);
        expect(admin.objectName().getAttribute('value')).toBe("Apache logs")
    });

    it("Packets dependencies", () => {
    	login.performLogin("admin", "conex.admin");
        usermenu.openUserMenu();
        admin.selectAdmin();

        admin.packetsLink().click();
        expect(admin.title().getText()).toBe("Packets");
        admin.objectCard().click();
        expect(admin.objectEdit().isPresent()).toBe(true);
        expect(admin.objectName().getAttribute('value')).toBe("Existing Correlation rule")
    });

    it("Attack Phases", () => {
    	login.performLogin("admin", "conex.admin");
        usermenu.openUserMenu();
        admin.selectAdmin();

        admin.phasesLink().click();
        expect(admin.title().getText()).toBe("Attack phases");
        admin.objectCard().click();
        expect(admin.objectEdit().isPresent()).toBe(true);
        expect(admin.objectName().getAttribute('value')).toBe("Command & Control")
    });

    it("Platforms", () => {
    	login.performLogin("admin", "conex.admin");
        usermenu.openUserMenu();
        admin.selectAdmin();

        admin.platformsLink().click();
        expect(admin.title().getText()).toBe("Platforms");
        admin.objectCard().click();
        expect(admin.objectEdit().isPresent()).toBe(true);
        expect(admin.objectName().getAttribute('value')).toBe("ArcSight - Active Channel Rules")
    });

    it("Protocols", () => {
    	login.performLogin("admin", "conex.admin");
        usermenu.openUserMenu();
        admin.selectAdmin();

        admin.protocolsLink().click();
        expect(admin.title().getText()).toBe("Protocols");
        admin.objectCard().click();
        expect(admin.objectEdit().isPresent()).toBe(true);
        expect(admin.objectName().getAttribute('value')).toBe("ANY")
    });

    it("Settings", () => {
    	login.performLogin("admin", "conex.admin");
        usermenu.openUserMenu();
        admin.selectAdmin();

        admin.settingsLink().click();
        expect(admin.title().getText()).toBe("Settings");
        admin.objectCard().click();
        expect(admin.objectEdit().isPresent()).toBe(true);
        expect(admin.objectName().getAttribute('value')).toBe("RULE_ARCHIVE_DAYS")
    });

    it("Threat Actors", () => {
    	login.performLogin("admin", "conex.admin");
        usermenu.openUserMenu();
        admin.selectAdmin();

        admin.threatActorsLink().click();
        expect(admin.title().getText()).toBe("Threat actors");
        admin.objectCard().click();
        expect(admin.objectEdit().isPresent()).toBe(true);
        expect(admin.objectName().getAttribute('value')).toBe("APT")
    });

    it("Threat Categories", () => {
    	login.performLogin("admin", "conex.admin");
        usermenu.openUserMenu();
        admin.selectAdmin();

        admin.threatCategoriesLink().click();
        expect(admin.title().getText()).toBe("Threat categories");
        admin.objectCard().click();
        expect(admin.objectEdit().isPresent()).toBe(true);
        expect(admin.objectName().getAttribute('value')).toBe("Browser Hijacking")
    });
})
