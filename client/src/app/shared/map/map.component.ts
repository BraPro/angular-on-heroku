import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapDialogBoxComponent } from '../../main/dialog-box/map-dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Garage } from '../../_models'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})



export class MapComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  israel = {lat: 32.615846, lng: 35.304594};
  selected = 'None';

  constructor(public dialog: MatDialog){};

  openDialog(action) {
    var Sendmarkers = [this.markers,action];
    const dialogRef = this.dialog.open(MapDialogBoxComponent, {
      width: '250px',
      data:Sendmarkers
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.AddGarage(result.data);
      }else if(result.event == 'Choose'){
        this.ChooseGarage(result.data);
      }
    });
  }
  
  markers = [
    {
      position: new google.maps.LatLng(32.800861, 35.104454),
      map: this.map,
      title: "Arik-Garage",
      icon:"https://img.icons8.com/dusk/40/000000/car-service.png",
      animation: google.maps.Animation.DROP
    },
    {
      position: new google.maps.LatLng(32.847993, 35.063184),
      map: this.map,
      title: "Dor-Garage",
      icon:"https://img.icons8.com/dusk/40/000000/car-service.png",
      animation: google.maps.Animation.DROP
    },
    {
    position: new google.maps.LatLng(32.615846, 35.304594),
    map: this.map,
    title: "Shlomi-Garage",
    icon:"https://img.icons8.com/dusk/40/000000/car-service.png",
    animation: google.maps.Animation.DROP
    }
  ];

  

  //Coordinates to set the center of the map
 // coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.israel,
    zoom: 10
  };

  //Default Marker
  marker = new google.maps.Marker({
  });

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
   this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
   var select = document.createElement('div');
   this.selectControl(select);
   this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(select);

    //Adding Click event to default marker
    this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    //Adding default marker to map
    this.marker.setMap(this.map);

    //Adding other markers
    this.loadAllMarkers();
  }

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
      marker.setMap(this.map);
    }); }

    selectControl(controlDiv){
      // Set CSS for the control interior.
      var control=this;
      var controlAdd = document.createElement('img');
      controlAdd.style.paddingLeft = '20px';
      controlAdd.style.paddingRight = '10px';
      controlAdd.srcset="https://img.icons8.com/emoji/50/000000/plus-emoji.png";
      controlAdd.title ="Add New Garage";
      controlDiv.appendChild(controlAdd);

      controlAdd.addEventListener('mouseenter', function() {
        controlAdd.style.cursor = "pointer";});

      controlAdd.addEventListener('mouseleave', function() {
        controlAdd.style.cursor = "default"});
  
      var controlChoose = document.createElement('img');
      controlAdd.style.paddingLeft = '20px';
      controlAdd.style.paddingRight = '35px';
      controlChoose.srcset="https://img.icons8.com/cotton/45/000000/filter--v2.png";
      controlChoose.title ="Choose A Garage";
      controlDiv.appendChild(controlChoose);
       
      controlChoose.addEventListener('mouseenter', function() {
        controlChoose.style.cursor = "pointer"});

      controlChoose.addEventListener('mouseleave', function() {
        controlChoose.style.cursor = "default"});
        
      // Setup the click event listeners.
      controlAdd.addEventListener('click', function() {
        control.openDialog('Add');

	  });
	  
	    controlChoose.addEventListener('click', function() {
        control.openDialog('Choose');
	  });
        
    }

    geocodeAddress(geocoder, resultsMap,address) {
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          resultsMap.setCenter(results[0].geometry.location);
          alert(results[0].geometry.location);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
   
    

    AddGarage(data:any)
    {
       alert('AddGarage');
       var geocoder = new google.maps.Geocoder();
       this.geocodeAddress(geocoder, this.map,"adress");
    }

    ChooseGarage(data:any){alert('ChooseGarage');}

  }

 

/* map.setCenter({lat: 41.85, lng: -87.65});

var markers;
var bounds;



function plotMarkers(m)
{
  markers = [];
  bounds = new google.maps.LatLngBounds();

  m.forEach(function (marker) {
    var position = new google.maps.LatLng(marker.lat, marker.lng);

    markers.push(
      new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP
      })
    );

    bounds.extend(position);
  });

  map.fitBounds(bounds);
}*/