import { Treatment } from './treatment';
import { Customer } from './customer';

export class Car{
    id: number;
    brand: string;
    model: string;
    year: number;
    customers: Customer[];
    treatments : Treatment[];
}