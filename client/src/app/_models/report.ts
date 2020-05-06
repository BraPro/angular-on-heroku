import {Garage} from './garage'

export class GarageReport extends Garage {
    report: { _id: {month: number, year: number}, cost: number, count: number}[];
}