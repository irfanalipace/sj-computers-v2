import React, { useEffect } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
export default function GooglePlacesAutoComplete() {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
  });
  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        placeDetails => savePlaceDetailsToState(placeDetails),
      );
  }, [placePredictions]);
  return (
    <>
      <input
        placeholder='Debounce 500 ms'
        onChange={evt => {
          getPlacePredictions({ input: evt.target.value });
        }}
        // loading={isPlacePredictionsLoading}
      />
      {placePredictions.map(item => renderItem(item))}
    </>
  );
}
