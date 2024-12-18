

import { LONGITUDE, LATITUDE } from "src/constants/constants";

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
