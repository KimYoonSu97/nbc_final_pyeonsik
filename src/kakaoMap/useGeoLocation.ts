import React, { useEffect, useState } from 'react';
import { LocInform } from 'src/types/types';

declare global {
  interface Window {
    kakao: any;
  }
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<Omit<LocInform, 'content'>>();
  const [error, setError] = useState('');

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLocation({ position: { lat: latitude, lng: longitude } });
  };

  const handleError = (err: GeolocationPositionError) => {
    setLocation({
      position: {
        lat: 37.483034,
        lng: 126.902435
      }
    });
    console.log('위치 받기 실패');
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error };
};
