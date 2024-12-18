

export const LONGITUDE = 144.9589295;
export const LATITUDE = -37.82322920000001;

export interface ILocation {
  address: string;
  googleMapId: string;
  longitude: number;
  latitude: number;
}

export function CreateNewLocation() {
  let location: ILocation = {
    address: "",
    longitude: LONGITUDE,
    latitude: LATITUDE,
    googleMapId: '',
  }

  return location;
};
