// Client model from the API server
import { ClientInterface } from './client.interface';
import { UserInterface } from './user.interface';

export interface ProfileInterface {
    id: number;
    clients: Array<ClientInterface>;
    user: number;
}