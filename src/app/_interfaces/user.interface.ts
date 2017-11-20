// Django user model
import { GroupInterface } from './group.interface';
import { ProfileInterface } from './profile.interface';

export interface UserInterface {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    groups: Array<GroupInterface>;
    profile: ProfileInterface;
}