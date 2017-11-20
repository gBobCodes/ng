import { browser, element, by } from 'protractor';

export class AddContent {

    attackchainphase() {
        return element(by.name("attack_chain_phase"));
    }

    contentlogic() {
        return element(by.name("content"));
    }

    categories() {
        return element(by.name("threat_categories"));
    }

    custom() {
        return element(by.name("custom"));
    }

    cve() {
        return element(by.name("cve"));
    }

    description() {
        return element(by.name("description"));
    }

    expirationDays() {
        return element(by.name("expiration_days"));
    }

    reference() {
        return element(by.name("reference"));
    }

    logs() {
        return element(by.name("logs"));
    }

    malwareFamily() {
        return element(by.name("malware_family"));
    }

    malwareVariant() {
        return element(by.name("malware_family_variant"));
    }

    navigateTo() {
        browser.get("/add_content");
    }
    
    packets() {
        return element(by.name("packets"));
    }

    platform() {
        return element(by.name("platform"));
    }

    protocol() {
        return element(by.name("protocol"));
    }

    sample() {
        return element(by.name("sample"));
    }

    saveButton() {
        return element(by.id('cx-content-btn'));
    }

    threatActor() {
        return element(by.name("threat_actor"));
    }

    threatActorName() {
        return element(by.name("threat_actor_name"));
    }

    title() {
        return element(by.name("title"));
    }

    zeroDay() {
        return element(by.name("zero_day"));
    }
}
