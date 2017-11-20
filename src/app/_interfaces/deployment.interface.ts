// Django user model
import { ApplianceInterface } from './appliance.interface';
import { StateInterface } from './state.interface';

export interface DeploymentInterface {
    id: number;
    appliance: ApplianceInterface;
    created: Date;
    last_updated: Date;
    rule: number;
    status: StateInterface;
}

export class DeploymentInterface implements DeploymentInterface {
    
    constructor(
    ) {
    }
}