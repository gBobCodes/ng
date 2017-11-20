// Comment model from the API server
import { UserInterface } from './user.interface';

export interface CommentInterface {
    author: UserInterface;
    created: Date;
    deployment: number;
    id: number;
    note: string;
    rule: number;
}
