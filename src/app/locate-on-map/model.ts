export type Location = {
    latitude: number;
    longitude: number;
}

export type MapPosition = {
    center: MapCenter;
    zoom: number;
}

export type MapCenter = {
    lat: number;
    lng: number;
}

export type PlacePhoto = {
    image: string;
    map: string;
}