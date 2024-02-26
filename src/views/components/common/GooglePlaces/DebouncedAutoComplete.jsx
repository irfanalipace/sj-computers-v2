import { useEffect } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PlaceIcon from '@mui/icons-material/Place';
import Avatar from '@mui/material/Avatar';
import { Box, ListItemIcon, Typography } from '@mui/material';
export default ({ placeholder = 'Select Location', ...rest }) => {
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
        placeDetails => {
          console.log(placeDetails);
        },
      );
  }, [placePredictions]);

  return (
    <>
      <input
        style={{ width: '100%', position: 'relative' }}
        {...rest}
        placeholder={placeholder}
        onChange={evt => {
          console.log(evt.target.value);
          getPlacePredictions({ input: evt.target.value });
        }}
        loading={isPlacePredictionsLoading}
      />
      {placePredictions.map(item => {
        return (
          <List
            dense
            disablePadding
            sx={{
              position: 'absolute',
              // width: "inherit",
              bgcolor: 'background.paper',
              zIndex: 9999,
            }}
          >
            <ListItem
              divider
              dense
              disablePadding
              disableGutters
              sx={{ py: '1px' }}
            >
              <ListItemIcon
                sx={{
                  minWidth: '20px',
                }}
              >
                <PlaceIcon
                  fontSize='14'
                  sx={{ color: 'lightgray', p: 0, m: 0 }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography fontFamily={'Inter'} fontSize={'14px'}>
                    {item.description}
                  </Typography>
                }
              />
            </ListItem>
          </List>
        );
      })}
    </>
  );
};
