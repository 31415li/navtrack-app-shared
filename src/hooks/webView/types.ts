export enum WebViewMapEvents {
  LocationPinUpdateEvent
}

export type LocationPinUpdateEvent = {
  latitude: number;
  longitude: number;
  follow?: boolean;
  resetZoom?: boolean;
};
