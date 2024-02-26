import React from 'react';
import Autocomplete from 'react-google-autocomplete';

export default function AutoComplete({ onPlaceSelected, ...rest }) {
  return (
    <Autocomplete
      {...rest}
      id='address'
      name='address'
      options={{
        fields: ['ALL'],
        types: ['address'],
        componentRestrictions: { country: 'us' },
      }}
      apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
      onPlaceSelected={onPlaceSelected}
    />
  );
}
