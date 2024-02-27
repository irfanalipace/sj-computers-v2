import React from 'react';
import Autocomplete from 'react-google-autocomplete';

export default function AutoComplete({ onChange, onPlaceSelected, ...rest }) {
  return (
    <Autocomplete
      {...rest}
      aria-autocomplete='none'
      id='address'
      name='address'
      options={{
        fields: ['ALL'],
        types: ['address'],
        componentRestrictions: { country: 'us' },
      }}
      apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
      onPlaceSelected={onPlaceSelected}
      onChange={onChange}
    />
  );
}
