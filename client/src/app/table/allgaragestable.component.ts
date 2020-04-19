import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface AllTreatmentData {
  id: number;
  car: number;
  customer: string;
  details: string;
  status: string;
  branch: string;
  bill:number;
}
 
const ELEMENT_DATA: AllTreatmentData[] = [
  {id: 1560608769632, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769633, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769634, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769635, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769636, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769637, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769638, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769639, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769640, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769641, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769642, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769643, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769644, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769645, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769646, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
  {id: 1560608769647, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting',branch:'afula',bill:400},
];


@Component({
  selector: 'app-allgaragestable',
  templateUrl: './allgaragestable.component.html',
  styleUrls: ['./allgaragestable.component.css'],
})
export class AllGaragesTableComponent implements OnInit {
	displayedColumns: string[] = ['id', 'car', 'customer', 'details','status','branch','bill'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);
  
	 @ViewChild(MatSort, {static: true}) sort: MatSort;
	 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	 
	ngOnInit() {
	  this.dataSource.sort = this.sort;
	  this.dataSource.paginator = this.paginator;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
  }
