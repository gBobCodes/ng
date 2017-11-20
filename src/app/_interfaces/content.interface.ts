// Rule model from the API server
import { CommentInterface } from './comment.interface';
import { DeploymentInterface } from './deployment.interface';
import { SimpleListInterface } from './simplelist.interface';
import { StateInterface } from './state.interface';
import { UserInterface } from './user.interface';

export interface ContentInterface {
    attack_phases: Array<SimpleListInterface>;
    author: UserInterface;
    client_customization: boolean;    
    comments: Array<CommentInterface>;
    content: string;
    content_source: string;
    created: Date;
    custom_inputs: Array<SimpleListInterface>;
    cve: string;
    description: string;
    deployments: Array<DeploymentInterface>;
    expiration_days: number;
    id: number;
    last_updated: Date;
    logs: Array<SimpleListInterface>;
    malware_family_name: string;
    malware_family_variant: string;
    packets: Array<SimpleListInterface>;
    platform: SimpleListInterface;
    protocol: SimpleListInterface;
    references: string;
    sample: string;
    status: StateInterface;
    threat_actor: SimpleListInterface;
    threat_actor_name: string;
    threat_categories: Array<SimpleListInterface>;
    title: string;
    user_actions: Array<string>;
    version: number;
    zero_day: boolean;
    next_states: Array<StateInterface>;
    visible_state_labels: Array<string>;
    canUserDeploy(): boolean;
    canUserModify(): boolean;
    canUserPort(): boolean;
    canUserRecall(): boolean;
    canUserRevise(): boolean;
}

export class ContentInterface implements ContentInterface {

    constructor(
    ) {
    }
    
    canUserDeploy(): boolean {
        // Does 'deploy' exist in the user ations array?
        return this.user_actions.indexOf('deploy') > -1;        
    }

    canUserModify(): boolean {
        // Does 'modify' exist in the user ations array?
        return this.user_actions.indexOf('modify') > -1;
    }

    canUserPort(): boolean {
        // Does 'port' exist in the user ations array?
        return this.user_actions.indexOf('port') > -1;        
    }

    canUserRecall(): boolean {
        // Does 'recall' exist in the user ations array?
        return this.user_actions.indexOf('recall') > -1;        
    }

    canUserRevise(): boolean {
        // Does 'revise' exist in the user ations array?
        return this.user_actions.indexOf('revise') > -1;        
    }

}