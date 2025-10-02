import type { GooglePlaceDetails } from '../services/googleMapsService';
import type { IPlaceData, IPlaceTag } from '../shared/types';

/**
 * Convert Google Maps place types to categories
 * Maps Google's place types to user-friendly category names
 */
export function mapGoogleTypesToCategories(types: string[]): IPlaceTag[] {
  const typeMapping: Record<string, string> = {
    restaurant: 'Restaurant',
    food: 'Restaurant',
    meal_takeaway: 'Takeaway',
    cafe: 'Cafe',
    bar: 'Bar',
    store: 'Store',
    shopping_mall: 'Shopping',
    tourist_attraction: 'Tourist Attraction',
    lodging: 'Hotel',
    hospital: 'Healthcare',
    school: 'Education',
    bank: 'Finance',
    gas_station: 'Gas Station',
    pharmacy: 'Pharmacy',
    gym: 'Fitness',
    beauty_salon: 'Beauty',
    church: 'Religious',
    park: 'Park',
    museum: 'Culture',
    movie_theater: 'Entertainment',
    night_club: 'Nightlife',
    spa: 'Wellness',
    car_rental: 'Transportation',
    airport: 'Transportation',
    subway_station: 'Transportation',
    train_station: 'Transportation',
    bus_station: 'Transportation',
  };

  const categories: IPlaceTag[] = [];
  const addedCategories = new Set<string>();

  // Convert Google types to categories
  types.forEach((type) => {
    const category = typeMapping[type];
    if (category && !addedCategories.has(category)) {
      categories.push({ name: category });
      addedCategories.add(category);
    }
  });

  // If no matching categories found, add a generic one based on the first type
  if (categories.length === 0 && types.length > 0) {
    const genericCategory = types[0]
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    categories.push({ name: genericCategory });
  }

  return categories;
}

/**
 * Convert Google Place Details to IPlaceData format
 * Transforms Google Maps API response to match your application's place structure
 */
export function convertGooglePlaceToIPlaceData(
  googlePlace: GooglePlaceDetails,
  additionalInfo?: string
): IPlaceData {
  const categories = mapGoogleTypesToCategories(googlePlace.types);

  return {
    categories: categories.map((cat) => cat.name).toString(),
    name: googlePlace.name,
    adress: googlePlace.formattedAddress,
    additionnalInfo: additionalInfo || '',
    imgSrc: googlePlace.photos?.[0]?.url || '',
    // Google Maps specific fields
    placeId: googlePlace.placeId,
    coordinates: googlePlace.coordinates,
    rating: googlePlace.rating,
    website: googlePlace.website,
    phoneNumber: googlePlace.phoneNumber,
    googlePhotos: googlePlace.photos?.map((photo) => photo.url) || [],
    googleMapsUrl: createGoogleMapsUrl({
      placeId: googlePlace.placeId,
      coordinates: googlePlace.coordinates,
      name: googlePlace.name,
    }),
  };
}

/**
 * Generate additional info text from Google Place details
 * Creates a formatted string with key place information
 */
export function generateAdditionalInfoFromGooglePlace(
  googlePlace: GooglePlaceDetails
): string {
  const infoItems: string[] = [];

  if (googlePlace.rating) {
    infoItems.push(`Rating: ${googlePlace.rating}/5`);
  }

  if (googlePlace.phoneNumber) {
    infoItems.push(`Phone: ${googlePlace.phoneNumber}`);
  }

  if (googlePlace.website) {
    infoItems.push(`Website: ${googlePlace.website}`);
  }

  if (googlePlace.openingHours?.openNow !== undefined) {
    infoItems.push(
      `Currently: ${googlePlace.openingHours.openNow ? 'Open' : 'Closed'}`
    );
  }

  if (googlePlace.priceLevel !== undefined) {
    const priceLevelText = [
      'Free',
      'Inexpensive',
      'Moderate',
      'Expensive',
      'Very Expensive',
    ];
    infoItems.push(
      `Price Level: ${priceLevelText[googlePlace.priceLevel] || 'Unknown'}`
    );
  }

  return infoItems.join(' | ');
}

/**
 * Format coordinates as a readable string
 */
export function formatCoordinates(coordinates: {
  lat: number;
  lng: number;
}): string {
  return `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`;
}

/**
 * Calculate distance between two coordinates (in kilometers)
 * Uses the Haversine formula
 */
export function calculateDistance(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

/**
 * Validate if a string could be a Google Place ID
 * Place IDs typically start with certain prefixes
 */
export function isValidPlaceId(placeId: string): boolean {
  // Google Place IDs typically start with these prefixes
  const validPrefixes = ['ChIJ', 'EhQ', 'GhIJ', 'EkQ'];
  return (
    validPrefixes.some((prefix) => placeId.startsWith(prefix)) &&
    placeId.length > 10
  );
}

/**
 * Create a Google Maps URL for a place
 */
export function createGoogleMapsUrl(place: {
  placeId?: string;
  coordinates?: { lat: number; lng: number };
  name?: string;
}): string {
  const baseUrl = 'https://www.google.com/maps';

  if (place.placeId) {
    return `${baseUrl}/place/?q=place_id:${place.placeId}`;
  }

  if (place.coordinates) {
    return `${baseUrl}/@${place.coordinates.lat},${place.coordinates.lng},15z`;
  }

  if (place.name) {
    return `${baseUrl}/search/${encodeURIComponent(place.name)}`;
  }

  return baseUrl;
}
