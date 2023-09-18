import React from 'react';

export const GetDistanceBtw = (lat1: number, lon1: number, lat2: number, lon2: number, unit: string): number => {
  const deg2rad = (deg: number) => deg * (Math.PI / 180);
  const rad2deg = (rad: number) => rad * (180 / Math.PI);

  const theta = lon1 - lon2;
  let dist =
    Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

  dist = Math.acos(dist);
  dist = rad2deg(dist);
  dist = dist * 60 * 1.1515;

  if (unit === 'kilometer') {
    dist = dist * 1.609344;
  } else if (unit === 'meter') {
    dist = dist * 1609.344;
  }

  return dist;
};
