// Client model from the API server

export interface ClientInterface {
    id: number;
    abbr: string;
    enabled: boolean;
    name: string;
    pm_id: string;
}

export class ClientInterface implements ClientInterface {
    
    constructor() { }
}