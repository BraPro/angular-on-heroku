import { Person } from './person';
import { Garage } from './garage';
import { Manager } from './manager';

export class Employee extends Person{
    eid: number;
    email: string;
    password: string;
    garage: Garage;
    manager: Manager;
    token: string;
    status: string;
}