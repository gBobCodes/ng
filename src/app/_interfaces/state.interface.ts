// Django river workflow State model
export interface StateInterface {
    date_created: Date;
    date_updated: Date;
    description: string;
    id: number;
    label: string;
    slug: string;
}