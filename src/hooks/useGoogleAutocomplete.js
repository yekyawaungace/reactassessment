import { Loader } from '@googlemaps/js-api-loader';
import { useEffect } from 'react';

const useGoogleAutocomplete = (inputRef, onPlaceSelected) => {
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyDNbA8Oc727YkhOcljNcGfebNM4gBcfu-0',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const location = {
          name: place.name,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        onPlaceSelected(location);
      });
    });
  }, [inputRef, onPlaceSelected]);
};

export default useGoogleAutocomplete;