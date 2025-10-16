import { useEffect, useState } from 'react';
import { useGetPlacesData } from 'src/features/Places/services/places.api';
import type {
  IPlaceWithDetailsAndTags,
  IUseGetPlacesProps,
} from '../types/hooks.types';
import { useGoogleMaps } from './useGoogleMaps';

export const useGetPlacesList = (apiKey: string): IUseGetPlacesProps => {
  const { data: placesData } = useGetPlacesData();
  const { getPlaceDetails } = useGoogleMaps({ apiKey });
  const [places, setPlaces] = useState<IPlaceWithDetailsAndTags[]>([]);

  useEffect(() => {
    async function fetchPlaces() {
      if (!placesData?.data) return;

      try {
        // Fetch Google details for each placeId
        const details = await Promise.all(
          placesData.data.map(async (place) => {
            const detail = await getPlaceDetails(place.placeId);
            return {
              details: detail,
              tags: place.tags ?? [],
            };
          })
        );
        setPlaces(details);
      } catch (err) {
        console.error('Error fetching place details:', err);
      }
    }

    fetchPlaces();
  }, [placesData, getPlaceDetails]);

  // Optionally flatten all tags across all places
  const allTags = places.flatMap((p) => p.tags);

  return {
    placesWithDetails: places,
    tags: allTags,
  };
};
