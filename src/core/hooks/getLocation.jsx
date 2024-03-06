import { useState, useEffect } from 'react';

const useLocation1 = () => {
  const [location1, setLocation1] = useState({ zipCode: '', state: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `http://maps.google.com/maps/api/js?key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = () => {
        getLocation();
      };
      script.onerror = () => {
        setError('Error loading Google Maps API');
        setLoading(false);
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            getAddressFromCoordinates(
              position.coords.latitude,
              position.coords.longitude,
            );
          },
          error => {
            setError(error.message);
            setLoading(false);
          },
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    const getAddressFromCoordinates = (latitude, longitude) => {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: latitude, lng: longitude };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK') {
          let zipCode = '';
          let state = '';
          zipCode = results[2].address_components[10]?.short_name;

          for (let i = 0; i < results[0].address_components.length; i++) {
            const component = results[0].address_components[i];

            if (component.types.includes('administrative_area_level_1')) {
              state = component.short_name;
            }
          }

          setLocation1({ zipCode, state });
          setLoading(false);
        } else {
          setError(`Geocoder failed due to: ${status}`);
          setLoading(false);
        }
      });
    };

    loadGoogleMapsScript();
  }, []);

  return { location1, loading, error };
};

export default useLocation1;
