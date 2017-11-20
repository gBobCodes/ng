import { Http } from '@angular/http';

import { UserService } from '../_services/index';
import { ContentInterface } from './content.interface';


describe('Content Interface : Author Permissions : ', () => {
    // Test Content Interface methods for Author group.
    let http: Http;
    const userService = new UserService(http);

    it('canUserModify() returns true', () => {
        // Verify an Author can edit content in appropriate states.
        userService._generateTestUser('Author');
        let testData = {
            'user_actions': ['modify',]
        }
        let content = Object.assign( new ContentInterface(), testData);
        expect(content.canUserModify()).toEqual(true);

        expect(content.canUserDeploy()).toEqual(false);

        expect(content.canUserPort()).toEqual(false);

        expect(content.canUserRecall()).toEqual(false);

        expect(content.canUserRevise()).toEqual(false);
    });
});
