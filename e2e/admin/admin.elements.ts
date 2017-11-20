import { element, by } from 'protractor';


export class Admin {
	// return elements on Admin Account  - 1) Left Panel; 2) Title, 3) Data Table
	// this page only can be viewed by Admin group user

	selectAdmin() {
		return element(by.partialLinkText("Administration")).click();
	}

	accountsLink() {
		return element(by.partialLinkText("Accounts"));
	}

	clientsLink() {
		return element(by.partialLinkText("Clients"));
	}

	customLink() {
		return element(by.partialLinkText("Custom"));
    }

	logsLink() {
		return element(by.partialLinkText("Logs"));
    }

	packetsLink() {
		return element(by.partialLinkText("Packets"));
	}

	phasesLink() {
		return element(by.partialLinkText("Phases"));
	}

	platformsLink() {
		return element(by.partialLinkText("Platform"));
	}

	settingsLink() {
		return element(by.partialLinkText("Settings"));
	}

	threatActorsLink() {
		return element(by.partialLinkText("Threat Actors"));
	}

	threatCategoriesLink() {
		return element(by.partialLinkText("Threat Categories"));
	}

	protocolsLink() {
		return element(by.partialLinkText("Protocols"));
    }

	title() {
		return element(by.id("admin-title"));
    }

    objectCard() {
        return element(by.className("cx-admin-detail-edit"));
    }

    objectEdit() {
        return element(by.className("cx-admin-buttons"));
    }

    objectName() {
        return element(by.id("name"));
    }
}
