import { useEffect, useState } from 'react';
import { useGetPlacesData } from 'src/api/places';
import type { GooglePlaceDetails } from 'src/services/googleMapsService';
import type { IPlaceTag } from 'src/shared/types';
import { useGoogleMaps } from './useGoogleMaps';

type PlaceWithDetailsAndTags = {
  details: GooglePlaceDetails;
  tags: IPlaceTag[];
};

type UseGetPlaces = {
  placesWithDetails: PlaceWithDetailsAndTags[];
  tags: IPlaceTag[]; // maybe you want a combined tag list too
};

export const useGetPlacesList = (apiKey: string): UseGetPlaces => {
  const { data: placesData } = useGetPlacesData();
  const { getPlaceDetails } = useGoogleMaps({ apiKey });
  const [places, setPlaces] = useState<PlaceWithDetailsAndTags[]>([]);

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
