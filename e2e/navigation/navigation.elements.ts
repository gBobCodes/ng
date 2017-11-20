import { element, by } from 'protractor';

export class ViewNav {
	// return 5 item links on Navigation Menu - 'Add Content' Only for Author group user

	dashboardLink() {
		return element(by.id("dashboard_link"));
	}

	addContentLink() {
		return element(by.id("add_content_link"));
	}

	clientsLink() {
		return element(by.id("clients_link"));
	}

	searchLink() {
		return element(by.id("search_link"));
	}

    searchText() {
		return element(by.id("search"));
	}
}
