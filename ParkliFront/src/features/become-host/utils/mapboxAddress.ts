import type { SearchBoxFeatureSuggestion } from "@mapbox/search-js-core";

export interface ParsedAddress {
  fullAddress: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  latitude: number;
  longitude: number;
}

// Wrigley Field — used to bias address suggestions toward the stadium area.
export const WRIGLEY_FIELD_PROXIMITY = { lng: -87.6553, lat: 41.9484 };

export function parseMapboxAddress(feature: SearchBoxFeatureSuggestion): ParsedAddress {
  const { properties, geometry } = feature;
  const context = properties.context ?? {};
  const [longitude, latitude] = geometry.coordinates;

  const street =
    context.address?.name ??
    [context.address_number?.name, context.street?.name].filter(Boolean).join(" ");

  return {
    fullAddress: properties.full_address ?? properties.name,
    address: street || properties.name,
    city: context.place?.name ?? context.locality?.name ?? "",
    state: context.region?.region_code ?? context.region?.name ?? "",
    zipcode: context.postcode?.name ?? "",
    latitude,
    longitude,
  };
}
