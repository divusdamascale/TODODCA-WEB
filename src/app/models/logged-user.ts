import { List } from "./list";
import { Profile } from "./profile";
import { Tag } from "./tag";

export interface LoggedUser {
    userId: number;
    token: string;
    username: string;
    email: string;
    lists: List[];
    profile?: Profile; 
    tags: Tag[];
}
