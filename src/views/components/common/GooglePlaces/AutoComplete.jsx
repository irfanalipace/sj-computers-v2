import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import config from '../../../../core/services/configService';

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
      apiKey={config.VITE_APP_GOOGLE_MAPS_API_KEY}
      onPlaceSelected={onPlaceSelected}
      onChange={onChange}
    />
  );
}
