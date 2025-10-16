import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { PlaceDispatchContext } from 'src/context/Places/PlacesContext';
import type {
  GooglePlaceDetails,
  GooglePlaceSearchResult,
} from 'src/services/googleMapsService';
import {
  convertGooglePlaceToIPlaceData,
  generateAdditionalInfoFromGooglePlace,
} from 'utils/googleMapsHelpers';
import { Input } from 'components/ui/Input';
import { useGoogleMaps } from '../hooks/useGoogleMaps';
import { useNavigate } from 'react-router';

interface SearchResult extends GooglePlaceSearchResult {
  isLoading?: boolean;
}

/**
 * PlaceSearch Component
 * Provides Google Maps Places search functionality with autocomplete-like behavior
 */
export function PlaceSearch() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const placeDispatchAction = useContext(PlaceDispatchContext);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // Get API key from environment variable
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '';

  const {
    isLoading: isMapsLoading,
    isReady,
    searchPlaces,
    getPlaceDetails,
  } = useGoogleMaps({
    apiKey,
    autoInitialize: true,
  });

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim() || !isReady) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        setErrorMessage('');
        const results = await searchPlaces(searchQuery);
        setSearchResults(results.slice(0, 5)); // Limit to 5 results
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'Search failed';
        setErrorMessage(errorMessage);
        setSearchResults([]);
        setShowResults(false);
      } finally {
        setIsSearching(false);
      }
    },
    [isReady, searchPlaces]
  );

  const handlePlaceSelect = useCallback(
    async (placeResult: SearchResult) => {
      // Mark this result as loading
      setSearchResults((prev) =>
        prev.map((result) =>
          result.placeId === placeResult.placeId
            ? { ...result, isLoading: true }
            : result
        )
      );

      try {
        const placeDetails: GooglePlaceDetails = await getPlaceDetails(
          placeResult.placeId
        );
        const additionalInfo =
          generateAdditionalInfoFromGooglePlace(placeDetails);

        const placeData = convertGooglePlaceToIPlaceData(
          placeDetails,
          additionalInfo
        );

        if (placeDispatchAction !== null) {
          placeDispatchAction({
            type: 'Set_Select_Place',
            payload: {
              adress: placeData.adress,
              name: placeData.name,
              googleMapsUrl: placeData.googleMapsUrl,
              imgSrc: placeData.imgSrc,
              placeId: placeData.placeId,
            },
          });
          void navigate('/places/search/add-details');
        }

        // Clear search after selection
        setQuery('');
        setSearchResults([]);
        setShowResults(false);
        setErrorMessage('');
      } catch (error) {
        console.error('Error getting place details:', error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to get place details';
        setErrorMessage(errorMessage);
      } finally {
        // Remove loading state
        setSearchResults((prev) =>
          prev.map((result) =>
            result.placeId === placeResult.placeId
              ? { ...result, isLoading: false }
              : result
          )
        );
      }
    },
    [getPlaceDetails, navigate, placeDispatchAction]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout for debounced search
    debounceTimeoutRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    if (searchInputRef.current !== null) {
      searchInputRef.current.focus();
    }
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const handleInputBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowResults(false), 200);
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {errorMessage && (
        <div
          className={`mb-5 w-full rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700`}
        >
          {errorMessage}
        </div>
      )}
      <div className={`relative h-fit w-full`}>
        {/* Search Input */}
        <div
          className={
            'relative flex h-fit w-full items-end justify-center gap-2 rounded-2xl border-2 border-slate-300 p-3 shadow-blue-500/25 transition-all duration-75 ease-out focus-within:border-blue-600 focus-within:shadow-lg'
          }
        >
          <Input
            inputRef={searchInputRef}
            name="name"
            placeholder="Tape un endroit sympa…"
            value={query}
            onValueChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            data-testid="place-search-input"
          />
          {/* Loading indicator */}
          {(isMapsLoading || isSearching) && (
            <div className="top-1/2 right-3 -translate-y-1/2 transform">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            </div>
          )}
        </div>
        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-300 bg-white">
            {searchResults.map((result) => (
              <button
                key={result.placeId}
                onClick={() => handlePlaceSelect(result)}
                disabled={result.isLoading}
                className="w-full border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900">
                      {result.name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {result.formattedAddress}
                    </p>
                  </div>

                  {result.isLoading && (
                    <div className="ml-2 flex-shrink-0">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
