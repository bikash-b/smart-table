import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { google } from "google-maps";
import { MapPosition, MapCenter, PlacePhoto } from './model';

@Component({
  selector: 'app-locate-on-map',
  templateUrl: './locate-on-map.component.html',
  styleUrls: ['./locate-on-map.component.scss']
})
export class LocateOnMapComponent implements OnInit {

  // Input decorators.
  @Input() markerIcon: string;
  @Input() markerWidth: number = 20;
  @Input() markerHeight: number = 20;
  @Input() defaultMapPosition: MapPosition = {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  };
  @Input() autoCompletePostStyle: string;

  // View child for getting component or element reference.
  @ViewChild('map') mapRef: ElementRef;
  @ViewChild('mapAutoCompleteSerch') autoCompleteInput: ElementRef;

  // Component class variables
  map: any;
  marker: any;
  autocomplete: any;
  photos: PlacePhoto[] = [];

  constructor() { }

  /**
   * Angular life cycle hook method.
   */
  ngOnInit() {
    this.onMapInit();
  }

  /**
   * To initialize the map while page. 
   */
  onMapInit(){
    let latLng: MapCenter = {} as MapCenter;

    // On getting browser location
    window.navigator.geolocation.getCurrentPosition(location => {
      latLng.lat = location.coords.latitude;
      latLng.lng = location.coords.longitude;
      this.defaultMapPosition.center = latLng;
      console.log(this.defaultMapPosition);
      this.onMapLoad();
      this.onAutoCompleteBoxLoad();
      this.loadMarker(latLng);
    }, error => {
      this.onMapLoad();
      this.onAutoCompleteBoxLoad();
    });
  }

  /**
   * To refresh the map if is there any search for the location.
   * @param newLatLng 
   * @param place 
   */
  onMapReInit(newLatLng: MapCenter, place?){
      this.defaultMapPosition.center = newLatLng;
      this.onMapLoad();
      this.loadMarker(newLatLng, place);
  }

  /**
   * To get the address details from the google place object.
   * @param place 
   */
  getCompleteAddress(place){
    let content = `<h2 style='font-family: Roboto,"Helvetica Neue",sans-serif'>${place.name}</h2><hr />`;
    let formattedAddredd = place.address_components;
    let completeAddress = `<h2>Detail address</h2>`;
    let addressComp = '';
    let contactDetail = `<div>
      ${place.international_phone_number ? place.international_phone_number : ''}
    </div>
    <div>
      ${place.website ? place.website : ''}
    </div>`;

    let review = this.getCompleteRating(place, true);
    let ratings = this.getCompleteReview(place);
    let openHours = this.getOpeningHours(place);

    if(formattedAddredd){
      addressComp = place.adr_address;
      completeAddress = `<div style="max-height: 250px;">` + 
        content + completeAddress + addressComp + contactDetail + openHours + review + ratings;
      `</div>`;
    }
    return completeAddress;
  }

  /**
   * To get hours for the google place object.
   * @param place 
   */
  getOpeningHours(place){
    let openingDetail = '<h2>Open Hours</h2>';
    if(place && place.opening_hours && place.opening_hours && place.opening_hours.weekday_text){
      let openHours = place.opening_hours.weekday_text;
      let openNow = place.opening_hours.open_now;
      openingDetail = openingDetail + `${openNow ? '<div style="color: green; font-weight: bold;padding: 0 0 10px 0; ">Open</div>' : '<div style="color: red; font-weight: bold;padding: 0 0 10px 0;">Closed</div>'}`;
      for(let i = 0; i < openHours.length; i++){
        openingDetail  = openingDetail + `<div>${openHours[i]}</div>`;
      }
    }else{
      openingDetail = '';
    }
    return openingDetail;
  }

  /**
   * To get the ratings of the google place object.
   * @param place 
   * @param header 
   */
  getCompleteRating(place, header){
    let ratingStar = header ? '<h2>Star Rating</h2>' : '';
    if(place && place.rating){
      let ratingInt = Math.round(place.rating);
      for(let i = 0; i < 5; i++){
        if(i < ratingInt){
          ratingStar = ratingStar + `<span class="fa fa-star checked"></span>`;
        }else{
          ratingStar = ratingStar + `<span class="fa fa-star"></span>`
        }
      }
    }else{
      ratingStar = '';
    }
    return ratingStar;
  }

  /**
   * To get the review of the google place.
   * @param place 
   */
  getCompleteReview(place){
    let reviewComments = '<h2>Reviews</h2>';
    let reviews = place.reviews;
    if(place && place.reviews){ 
      for(let i = 0; i < reviews.length; i++){
        let rating = this.getCompleteRating(reviews[i], false);
        let reviewComment = `<div>
        <div style="display: flex;align-items: center;">
          <a href=${reviews[i].author_url} style="text-decoration: none;color: #000000;display: flex" target="_blank">
            <img width="40" height="40" src=${reviews[i].profile_photo_url}>
            <span style="font-size: 15px;font-weight: bold;margin: 10px;">${reviews[i].author_name}</span>
          </a>
          <span>
            ${rating}
          </span>
          <span style="margin: 5px;">
          (
            ${reviews[i].relative_time_description}
          )
          </span>
        </div><div style="padding: 10px 0px 10px 50px;">${reviews[i].text}</div>`;
        reviewComment = reviewComment + '</div>';
        reviewComments = reviewComments + reviewComment;
      }
    }else{
      reviewComments = '';
    }
    
    return reviewComments;
  }

  /**
   * To load the content of the marker object.
   * @param place 
   */
  loadMarkerContent(place: any){
    let content = this.getCompleteAddress(place);

    let infowindow = new google.maps.InfoWindow({
      content: content,
    });
    this.marker.addListener('click', () => {
      infowindow.open(this.map, this.marker);
    });
  }
  
  /**
   * To create the google map object and load to the browser.
   */
  onMapLoad(){
    let mapContainerRef = this.mapRef;
    this.map = new google.maps.Map(mapContainerRef.nativeElement, this.defaultMapPosition);
  }

  /**
   * To load the photos of the google place if available.
   * @param photos 
   */
  loadPhotos(photos){
    this.photos = [];
    if(photos){
      photos.forEach(ele => {
        let photo: PlacePhoto = {} as PlacePhoto;
        photo.image = ele.getUrl();
        photo.map = ele.html_attributions[0];
        this.photos.push(photo);
      });
    }
  }

  /**
   * To navigate to the photo reference. 
   * @param mapLink 
   */
  navigateToImageDetail(mapLink){
    let link = mapLink.match(/href="(.*?)"/)[1];
    window.open(link, '_blank');
  }

  /**
   * To initialize and load the marker object.
   * @param latLng 
   * @param place 
   */
  loadMarker(latLng, place?){
    let icon = {
      url: this.markerIcon ? this.markerIcon : place ? place.icon : '',
      scaledSize: new google.maps.Size(this.markerWidth, this.markerHeight)
    };

    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: place ? place.name : 'Your search',
      icon: icon
    });
    this.marker.setMap(this.map);
  }

  /**
   * To search on the auto-complete box and trigger the change event. 
   */
  onAutoCompleteBoxLoad(){
    let input = this.autoCompleteInput.nativeElement;
    this.autocomplete = new google.maps.places.Autocomplete(input);
    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace();
      let latLng: MapCenter = {} as MapCenter;
      latLng.lat = place.geometry.location.lat();
      latLng.lng = place.geometry.location.lng();
      this.onMapReInit(latLng, place);
      this.loadMarkerContent(place);
      this.loadPhotos(place.photos);
      console.log("place = autocomplete.getPlace();", place);
    });
  }
}
