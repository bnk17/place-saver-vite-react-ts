import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type Ref,
} from 'react';
import {
  PlaceContext,
  PlaceDispatchContext,
} from 'src/context/Places/PlacesContext';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import type {
  GooglePlaceDetails,
  GooglePlaceSearchResult,
} from '../../services/googleMapsService';
import {
  convertGooglePlaceToIPlaceData,
  generateAdditionalInfoFromGooglePlace,
} from '../../utils/googleMapsHelpers';
import { Input } from '../ui/Input';

interface SearchResult extends GooglePlaceSearchResult {
  isLoading?: boolean;
}

type PlaceSearchProps = {
  inputRef: Ref<HTMLInputElement | null>;
};

/**
 * PlaceSearch Component
 * Provides Google Maps Places search functionality with autocomplete-like behavior
 */
export function PlaceSearch({ inputRef }: PlaceSearchProps) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const placeDispatchAction = useContext(PlaceDispatchContext);
  const placeState = useContext(PlaceContext);

  // Get API key from environment variable
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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

        const isNameExist = placeState?.placesState.some(({ name }) => {
          return name === placeData.name;
        });

        if (isNameExist) {
          throw new Error('Ce lieu à déjà été ajouté.');
        }

        if (placeDispatchAction !== null) {
          placeDispatchAction({
            type: 'Set_Add_Place',
            payload: {
              adress: placeData.adress,
              name: placeData.name,
              googleMapsUrl: placeData.googleMapsUrl,
              imgSrc: placeData.imgSrc,
            },
          });
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
    [getPlaceDetails, placeState?.placesState, placeDispatchAction]
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
    <div className=" h-full w-full flex flex-col items-center justify-center">
      {errorMessage && (
        <div
          className={`p-4 w-full bg-red-50 border border-red-200 rounded-md mb-5 text-red-700 text-sm`}
        >
          {errorMessage}
        </div>
      )}
      <div className={`relative w-full h-fit`}>
        {/* Search Input */}
        <div
          className={
            'border-2 border-slate-300 focus-within:border-blue-600 rounded-2xl w-full h-fit relative flex items-end justify-center p-3 gap-2 focus-within:shadow-lg shadow-blue-500/25 transition-all ease-out duration-75'
          }
        >
          <Input
            inputRef={inputRef}
            name="name"
            placeholder="Entrer le nom du lieu"
            value={query}
            onValueChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
          />

          {/* Loading indicator */}
          {(isMapsLoading || isSearching) && (
            <div className="right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className=" absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
            {searchResults.map((result) => (
              <button
                key={result.placeId}
                onClick={() => handlePlaceSelect(result)}
                disabled={result.isLoading}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {result.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {result.formattedAddress}
                    </p>
                  </div>

                  {result.isLoading && (
                    <div className="ml-2 flex-shrink-0">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* No results message */}
        {showResults &&
          searchResults.length === 0 &&
          query.trim() &&
          !isSearching && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
              <p className="text-gray-500 text-sm">
                No places found for "{query}"
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
