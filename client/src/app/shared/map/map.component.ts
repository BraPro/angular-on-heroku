import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapDialogBoxComponent } from '../../main/dialog-box/map-dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Garage, Location } from '../../_models'
import { GarageService } from '../../_services';
import { SharedService } from '@app/shared/shared.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})



export class MapComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  israel = {lat: 31.391959, lng: 35.217018};
  garages:Garage[];
  index:number;
  permission: string;  //'New Employee','Employee', 'Manager', 'Admin', 'None'

  constructor(public dialog: MatDialog,private garageService:GarageService,private sharedService: SharedService){
      this.sharedService.loginStateObservable.subscribe(res => {
      this.permission = res;
    })
  };

  openDialog(action,i) {
    if(action == "Edit"){
    var Sendmarkers = [this.garages,action,i]; 
    this.index=i;
    }
    else
    var Sendmarkers = [this.garages,action];
    
    const dialogRef = this.dialog.open(MapDialogBoxComponent, {
      width: '250px',
      data:Sendmarkers
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        // AddGarage(garage:any, garageService: GarageService, sharedService: SharedService, map : google.maps.Map, loadAllMarkers : Function)
        this.AddGarage(result.data, this.garageService, this.sharedService, this.map,  this.garages ,this.markers,this.RemoveAllmarkers ,this.loadAllMarkers);
      }else if(result.event == 'Choose'){
        this.ChooseGarage(result.data);
      }else if(result.event == 'Edit'){
        this.EditGarage(result.data);
      }else if(result.event == 'Delete'){
        this.DeleteGarage(result.data);
      }
    });
  }
  
  

  //Coordinates to set the center of the map
 // coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.israel,
    zoom: 8
  };

  //Default Markers
  markers = [];

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
   this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
   var select = document.createElement('div');
   this.selectControl(select);
   this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(select);

    //Adding markers
    this.loadAllMarkers(this.map , this.markers , this.permission );
  }

  loadAllMarkers(themap: google.maps.Map, markers , permission): void {

    this.garageService.getAll()
		.pipe(first())
		.subscribe(
			data => {
        this.garages=data;
        //import marks to map
        var control=this;
        var bounds = new google.maps.LatLngBounds();
        data.forEach(function (marker,i) {
          var position = new google.maps.LatLng(marker.location.position.lat, marker.location.position.lng);
          var check = new google.maps.Marker({
              position: position,
              map: themap,
              title: marker.name,
              icon:"https://img.icons8.com/dusk/40/000000/car-service.png",
              animation: google.maps.Animation.DROP,
            });
              if(permission == 'Admin'){
              check.addListener('click', function(){
                control.openDialog("Edit",i);
             });
            }
          markers.push(check);
          bounds.extend(position);
        });

       // this.map.fitBounds(bounds);  מרכז את המפה סביב הנקודות.

			},
			error => {
				//this.alertService.error(error);
				this.sharedService.sendAlertEvent(error);
			},
			() => {
			});
    
    
    } 

    selectControl(controlDiv){
      // Set CSS for the control interior.
      var control=this;
      var controlChoose = document.createElement('img');
      if(this.permission == 'Admin'){
      var controlAdd = document.createElement('img');
      controlAdd.style.paddingLeft = '20px';
      controlAdd.style.paddingRight = '35px';
      controlAdd.srcset="https://img.icons8.com/emoji/50/000000/plus-emoji.png";
      controlAdd.title ="Add New Garage";
      controlDiv.appendChild(controlAdd);

      controlAdd.addEventListener('mouseenter', function() {
        controlAdd.style.cursor = "pointer";});

      controlAdd.addEventListener('mouseleave', function() {
        controlAdd.style.cursor = "default"});

      controlAdd.addEventListener('click', function() {
          control.openDialog('Add' ,null);}); }
      else{
        controlChoose.style.paddingLeft = '20px';
        controlChoose.style.paddingRight = '35px';
      }
      
      controlChoose.srcset="https://img.icons8.com/cotton/45/000000/filter--v2.png";
      controlChoose.title ="Choose A Garage";
      controlDiv.appendChild(controlChoose);
       
      controlChoose.addEventListener('mouseenter', function() {
        controlChoose.style.cursor = "pointer"});

      controlChoose.addEventListener('mouseleave', function() {
        controlChoose.style.cursor = "default"});
        
	    controlChoose.addEventListener('click', function() {
        control.openDialog('Choose' ,null);});
        
    }

    findLatLang(address, geocoder) {
      return new Promise(function(resolve, reject) {
          geocoder.geocode({'address': address}, function(results, status) {
              if (status === 'OK') {
                  resolve({lat : results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()});
              } else {
                  reject(new Error('Couldnt\'t find the location ' + address));
              }
      })
      })
  } 
   

    async AddGarage(garage:any, garageService: GarageService, sharedService: SharedService, themap : google.maps.Map, garagearray : any ,markers , RemoveAllmarkers,loadAllMarkers)
    {
       var geocoder = new google.maps.Geocoder();
       let locationData = [];
       locationData.push(this.findLatLang(garage.location.street+', '+garage.location.city+', '+garage.location.country, geocoder))
       Promise.all(locationData)     
      .then(function(returnVals){
        garage.location.position = returnVals[0]; 
        garageService.add(garage)
         .pipe(first())
          .subscribe(
         data => {
            sharedService.sendAlertEvent(data);
            this.RemoveAllmarkers();
            this.loadAllMarkers(this.map , this.markers , this.permission);
         },
          error => {
          //this.alertService.error(error);
          sharedService.sendAlertEvent({response: 'Error', msg: 'Check your internet connection'});
         },
         () => {
          });
      }.bind(this))
      
        
      

     
      
    }

    ChooseGarage(garage:Garage){
      this.map.setCenter(garage.location.position);
      this.map.setZoom(15);
  }

    EditGarage(garage:Garage){
      this.garageService.update(garage)
      .pipe(first())
       .subscribe(
      data => {
        this.RemoveAllmarkers();
        this.loadAllMarkers(this.map , this.markers , this.permission);
         this.sharedService.sendAlertEvent(data);    
      },
       error => {
        //this.alertService.error(error);
       this.sharedService.sendAlertEvent({response: 'Error', msg: 'Check your internet connection'});
      },
      () => {
       });

    }
   
    DeleteGarage(garage:Garage){
      this.garageService.delete(garage._id)
      .pipe(first())
       .subscribe(
      data => {
          this.RemoveAllmarkers();
          this.loadAllMarkers(this.map , this.markers , this.permission);
          this.sharedService.sendAlertEvent(data);
      },
       error => {
        //this.alertService.error(error);
       this.sharedService.sendAlertEvent({response: 'Error', msg: 'Check your internet connection'});
      },
      () => {
       });

    }

    RemoveAllmarkers(){
      this.markers.forEach(marker => {
         marker.setMap(null);
      });

      this.markers=[];
      this.garages=[];
    }

  }
