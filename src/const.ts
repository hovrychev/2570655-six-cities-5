import {Icon} from 'leaflet';

export enum AppRoute {
  Login = '/login',
  Main = '/',
  Favorites = '/favorites',
  OfferId = '/offer/:id',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const CITY = {
  title: 'Амстердам',
  lat: 52.370228,
  lng: 4.902137,
  zoom: 11,
};

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Favorite = '/favorite',
  Comments = '/comments',
  Logout = '/logout',
}
