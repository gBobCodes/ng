// Appliance model from the API server
import { SimpleListInterface } from './simplelist.interface';

export interface ApplianceInterface {
    id: number;
    client: number;
    name: string;
    custom_inputs: Array<SimpleListInterface>;
    logs: Array<SimpleListInterface>;
    packets: Array<SimpleListInterface>;
    platform: SimpleListInterface;
    deployments_proposed_count: number;
    deployments_exported_count: number;
    deployments_deployed_count: number;
    deployments_recall_needed_count: number;
    deployments_recalled_count: number;
    deployments_declined_count: number;
}

export class ApplianceInterface implements ApplianceInterface {
    
    constructor() { }
}