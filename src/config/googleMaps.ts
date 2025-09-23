/**
 * Google Maps configuration and constants
 */

// Google Maps API configuration
export const GOOGLE_MAPS_CONFIG = {
  // Libraries to load
  libraries: ['places'] as const,
  
  // API version
  version: 'weekly' as const,
  
  // Default search options
  defaultSearchOptions: {
    radius: 50000, // 50km radius
  },
  
  // Maximum number of search results to display
  maxSearchResults: 5,
  
  // Default photo dimensions
  defaultPhotoOptions: {
    maxWidth: 400,
    maxHeight: 400,
  },
  
  // Debounce delay for search input (ms)
  searchDebounceDelay: 300,
} as const;

// Place types that are commonly searched for
export const COMMON_PLACE_TYPES = [
  'restaurant',
  'tourist_attraction',
  'lodging',
  'shopping_mall',
  'hospital',
  'school',
  'bank',
  'gas_station',
  'pharmacy',
  'gym',
  'park',
  'museum',
  'movie_theater',
  'cafe',
  'bar',
] as const;

// Mapping of Google place types to user-friendly categories
export const PLACE_TYPE_CATEGORIES = {
  // Food & Dining
  restaurant: 'Restaurant',
  food: 'Restaurant',
  meal_takeaway: 'Takeaway',
  meal_delivery: 'Delivery',
  cafe: 'Cafe',
  bar: 'Bar',
  bakery: 'Bakery',
  
  // Shopping
  store: 'Store',
  shopping_mall: 'Shopping Mall',
  clothing_store: 'Fashion',
  electronics_store: 'Electronics',
  book_store: 'Bookstore',
  jewelry_store: 'Jewelry',
  shoe_store: 'Shoes',
  
  // Entertainment & Culture
  tourist_attraction: 'Tourist Attraction',
  museum: 'Museum',
  art_gallery: 'Art Gallery',
  movie_theater: 'Cinema',
  amusement_park: 'Amusement Park',
  zoo: 'Zoo',
  aquarium: 'Aquarium',
  
  // Accommodation
  lodging: 'Hotel',
  
  // Health & Wellness
  hospital: 'Hospital',
  pharmacy: 'Pharmacy',
  dentist: 'Dentist',
  doctor: 'Doctor',
  veterinary_care: 'Veterinary',
  gym: 'Gym',
  spa: 'Spa',
  beauty_salon: 'Beauty Salon',
  
  // Education
  school: 'School',
  university: 'University',
  library: 'Library',
  
  // Services
  bank: 'Bank',
  atm: 'ATM',
  post_office: 'Post Office',
  car_rental: 'Car Rental',
  car_repair: 'Car Repair',
  gas_station: 'Gas Station',
  laundry: 'Laundry',
  
  // Recreation
  park: 'Park',
  stadium: 'Stadium',
  bowling_alley: 'Bowling',
  golf_course: 'Golf',
  
  // Nightlife
  night_club: 'Nightclub',
  
  // Religious
  church: 'Church',
  mosque: 'Mosque',
  synagogue: 'Synagogue',
  hindu_temple: 'Temple',
  
  // Transportation
  airport: 'Airport',
  subway_station: 'Subway',
  train_station: 'Train Station',
  bus_station: 'Bus Station',
  taxi_stand: 'Taxi',
  
  // Government
  city_hall: 'City Hall',
  courthouse: 'Courthouse',
  embassy: 'Embassy',
  police: 'Police Station',
  fire_station: 'Fire Station',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'Google Maps API key is required. Please set VITE_GOOGLE_MAPS_API_KEY in your environment variables.',
  INITIALIZATION_FAILED: 'Failed to initialize Google Maps API. Please check your API key and internet connection.',
  SEARCH_FAILED: 'Place search failed. Please try again.',
  DETAILS_FAILED: 'Failed to get place details. Please try again.',
  SERVICE_NOT_READY: 'Google Maps service is not ready. Please wait for initialization.',
  QUOTA_EXCEEDED: 'Google Maps API quota exceeded. Please try again later.',
  REQUEST_DENIED: 'Google Maps API request was denied. Please check your API key permissions.',
} as const;

// Helper function to get error message
export function getErrorMessage(status: string): string {
  switch (status) {
    case 'OVER_QUERY_LIMIT':
      return ERROR_MESSAGES.QUOTA_EXCEEDED;
    case 'REQUEST_DENIED':
      return ERROR_MESSAGES.REQUEST_DENIED;
    case 'INVALID_REQUEST':
      return 'Invalid request. Please check your search parameters.';
    case 'ZERO_RESULTS':
      return 'No results found. Please try a different search term.';
    case 'UNKNOWN_ERROR':
      return 'An unknown error occurred. Please try again.';
    default:
      return 'An error occurred while processing your request.';
  }
}

// Helper function to validate API key format
export function isValidGoogleMapsApiKey(apiKey: string): boolean {
  // Basic validation - Google Maps API keys typically start with 'AIza' and are 39 characters long
  return typeof apiKey === 'string' && 
         apiKey.startsWith('AIza') && 
         apiKey.length === 39;
}

// Helper function to get API key with validation
export function getGoogleMapsApiKey(): string {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
  }
  
  if (!isValidGoogleMapsApiKey(apiKey)) {
    console.warn('Google Maps API key format appears to be invalid. Expected format: AIza... (39 characters)');
  }
  
  return apiKey;
}