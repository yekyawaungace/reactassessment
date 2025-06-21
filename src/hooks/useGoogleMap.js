import { useEffect } from 'react';

const useGoogleMap = (mapRef, markerRef, place) => {
  useEffect(() => {
    if (!place || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: place.lat, lng: place.lng },
      zoom: 14,
    });

    markerRef.current = new window.google.maps.Marker({
      position: { lat: place.lat, lng: place.lng },
      map,
    });
  }, [place, mapRef, markerRef]);
};

export default useGoogleMap;