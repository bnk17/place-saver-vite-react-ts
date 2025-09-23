import { useState, useEffect, useCallback } from 'react';
import { getGoogleMapsService } from '../services/googleMapsService';
import type { 
  GooglePlaceDetails, 
  GooglePlaceSearchResult 
} from '../services/googleMapsService';

interface UseGoogleMapsConfig {
  apiKey: string;
  autoInitialize?: boolean;
}

interface UseGoogleMapsReturn {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  searchPlaces: (query: string, options?: {
    location?: { lat: number; lng: number };
    radius?: number;
    type?: string;
  }) => Promise<GooglePlaceSearchResult[]>;
  getPlaceDetails: (placeId: string) => Promise<GooglePlaceDetails>;
  searchAndGetDetails: (query: string, options?: {
    location?: { lat: number; lng: number };
    radius?: number;
    type?: string;
  }) => Promise<GooglePlaceDetails | null>;
  initialize: () => Promise<void>;
}

/**
 * React hook for Google Maps Places API integration
 * Provides easy access to place search and details functionality
 */
export function useGoogleMaps({ 
  apiKey, 
  autoInitialize = true 
}: UseGoogleMapsConfig): UseGoogleMapsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleMapsService = getGoogleMapsService(apiKey);

  const initialize = useCallback(async () => {
    if (isReady || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await googleMapsService.initialize();
      setIsReady(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Google Maps';
      setError(errorMessage);
      console.error('Google Maps initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [googleMapsService, isReady, isLoading]);

  const searchPlaces = useCallback(async (
    query: string,
    options?: {
      location?: { lat: number; lng: number };
      radius?: number;
      type?: string;
    }
  ): Promise<GooglePlaceSearchResult[]> => {
    if (!isReady) {
      throw new Error('Google Maps not ready. Please wait for initialization.');
    }

    setError(null);
    try {
      return await googleMapsService.searchPlaces(query, options);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search places';
      setError(errorMessage);
      throw err;
    }
  }, [googleMapsService, isReady]);

  const getPlaceDetails = useCallback(async (placeId: string): Promise<GooglePlaceDetails> => {
    if (!isReady) {
      throw new Error('Google Maps not ready. Please wait for initialization.');
    }

    setError(null);
    try {
      return await googleMapsService.getPlaceDetails(placeId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get place details';
      setError(errorMessage);
      throw err;
    }
  }, [googleMapsService, isReady]);

  const searchAndGetDetails = useCallback(async (
    query: string,
    options?: {
      location?: { lat: number; lng: number };
      radius?: number;
      type?: string;
    }
  ): Promise<GooglePlaceDetails | null> => {
    if (!isReady) {
      throw new Error('Google Maps not ready. Please wait for initialization.');
    }

    setError(null);
    try {
      return await googleMapsService.searchAndGetDetails(query, options);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search and get place details';
      setError(errorMessage);
      throw err;
    }
  }, [googleMapsService, isReady]);

  // Auto-initialize if enabled
  useEffect(() => {
    if (autoInitialize && !isReady && !isLoading) {
      initialize();
    }
  }, [autoInitialize, initialize, isReady, isLoading]);

  return {
    isLoading,
    isReady,
    error,
    searchPlaces,
    getPlaceDetails,
    searchAndGetDetails,
    initialize,
  };
}