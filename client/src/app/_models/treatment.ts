import { Garage } from './garage';
import { Customer } from './customer';
import { Car } from './car';

export class Treatment {
    _id: number;
    customer: Customer;
    garage: Garage;
    car: Car;
	status: {type: string, enum : ['Waiting','In process', 'Done']};
	details: string;
	date: Date;
}