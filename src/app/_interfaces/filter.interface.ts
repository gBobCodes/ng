// Filtering Params from the backend
export interface FilterInterface {
    attack_phases: string;
    custom_inputs: string;
    client: string;
    created_date_start: Date;
    created_date_end: Date;
    logs: string;
    modified_date_start: Date;
    modified_date_end: Date;
    packets: string;
    platform: string;
    protocol: string;
    search: string;
    state: string;
    threat_actor: string;
    zero_day: boolean;
}

export class FilterInterface implements FilterInterface {

    constructor() { }
}
