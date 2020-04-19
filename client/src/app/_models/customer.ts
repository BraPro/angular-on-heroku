import { Person } from './person';
import { Car } from './car';
import { Treatment } from './treatment';

export class Customer extends Person{
    cid: number;
    cars: Car[];
    treatments : Treatment[];
}