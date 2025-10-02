import { Loader } from '@googlemaps/js-api-loader';
import { createGoogleMapsUrl } from '../utils/googleMapsHelpers';

export interface GooglePlaceSearchResult {
  placeId: string;
  name: string;
  formattedAddress: string;
  types: string[];
  googleMapsUrl: string;
  imgUrl?: google.maps.places.PlacePhoto[];
}

export interface GooglePlaceDetails {
  placeId: string;
  name: string;
  address: string;
  formattedAddress: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating?: number;
  website?: string;
  phoneNumber?: string;
  photos?: { url: string }[];
  types: string[];
  openingHours?: {
    openNow?: boolean;
  };
  priceLevel?: number;
}

class GoogleMapsService {
  private loader: Loader;
  private placesService: google.maps.places.PlacesService | null = null;
  private isInitialized = false;

  constructor(apiKey: string) {
    this.loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    });
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.loader.load();

      // Create a dummy map element for PlacesService
      const mapDiv = document.createElement('div');
      const map = new google.maps.Map(mapDiv);
      this.placesService = new google.maps.places.PlacesService(map);

      this.isInitialized = true;
    } catch (error) {
      throw new Error(`Failed to initialize Google Maps: ${error}`);
    }
  }

  async searchPlaces(
    query: string,
    options?: {
      location?: { lat: number; lng: number };
      radius?: number;
      type?: string;
    }
  ): Promise<GooglePlaceSearchResult[]> {
    await this.initialize();

    if (!this.placesService) {
      throw new Error('Google Maps service not initialized');
    }

    return new Promise((resolve, reject) => {
      const request: google.maps.places.TextSearchRequest = {
        query,
      };

      // Add optional parameters
      if (options?.location) {
        request.location = new google.maps.LatLng(
          options.location.lat,
          options.location.lng
        );
      }
      if (options?.radius) {
        request.radius = options.radius;
      }
      if (options?.type) {
        request.type = options.type;
      }

      this.placesService!.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const places = results.map(this.convertToSearchResult);
          resolve(places);
        } else {
          reject(new Error(`Places search failed: ${status}`));
        }
      });
    });
  }

  async searchPlacesDetailed(query: string): Promise<GooglePlaceDetails[]> {
    await this.initialize();

    if (!this.placesService) {
      throw new Error('Google Maps service not initialized');
    }

    return new Promise((resolve, reject) => {
      const request: google.maps.places.TextSearchRequest = {
        query,
      };

      this.placesService!.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const places = results.map(this.convertToPlaceDetails);
          resolve(places);
        } else {
          reject(new Error(`Places search failed: ${status}`));
        }
      });
    });
  }

  async getPlaceDetails(placeId: string): Promise<GooglePlaceDetails> {
    await this.initialize();

    if (!this.placesService) {
      throw new Error('Google Maps service not initialized');
    }

    return new Promise((resolve, reject) => {
      const request: google.maps.places.PlaceDetailsRequest = {
        placeId,
        fields: [
          'place_id',
          'name',
          'formatted_address',
          'geometry',
          'rating',
          'website',
          'international_phone_number',
          'photos',
          'types',
          'opening_hours',
          'price_level',
        ],
      };

      this.placesService!.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          resolve(this.convertToPlaceDetails(place));
        } else {
          reject(new Error(`Place details failed: ${status}`));
        }
      });
    });
  }

  private convertToSearchResult(
    place: google.maps.places.PlaceResult
  ): GooglePlaceSearchResult {
    return {
      placeId: place.place_id || '',
      name: place.name || '',
      formattedAddress: place.formatted_address || '',
      types: place.types || [],
      imgUrl: place.photos || [],
      googleMapsUrl: createGoogleMapsUrl({
        placeId: place.place_id || '',
        coordinates: {
          lat: place.geometry?.location?.lat() || 0,
          lng: place.geometry?.location?.lng() || 0,
        },
        name: place.name || '',
      }),
    };
  }

  private convertToPlaceDetails(
    place: google.maps.places.PlaceResult
  ): GooglePlaceDetails {
    const photos =
      place.photos?.slice(0, 5).map((photo) => ({
        url: photo.getUrl({ maxWidth: 400, maxHeight: 300 }),
      })) || [];

    return {
      placeId: place.place_id || '',
      name: place.name || '',
      address: place.formatted_address || '',
      formattedAddress: place.formatted_address || '',
      coordinates: {
        lat: place.geometry?.location?.lat() || 0,
        lng: place.geometry?.location?.lng() || 0,
      },
      rating: place.rating,
      website: place.website,
      phoneNumber: place.international_phone_number,
      photos,
      types: place.types || [],
      openingHours: place.opening_hours
        ? {
            openNow: place.opening_hours.isOpen?.(),
          }
        : undefined,
      priceLevel: place.price_level,
    };
  }

  async searchAndGetDetails(
    query: string,
    options?: {
      location?: { lat: number; lng: number };
      radius?: number;
      type?: string;
    }
  ): Promise<GooglePlaceDetails | null> {
    const searchResults = await this.searchPlaces(query, options);

    if (searchResults.length === 0) {
      return null;
    }

    // Get details for the first result
    try {
      return await this.getPlaceDetails(searchResults[0].placeId);
    } catch (error) {
      console.error('Failed to get place details:', error);
      return null;
    }
  }
}

// Singleton instance
let instance: GoogleMapsService | null = null;

export function getGoogleMapsService(apiKey: string): GoogleMapsService {
  if (!instance) {
    instance = new GoogleMapsService(apiKey);
  }
  return instance;
}

export default GoogleMapsService;
