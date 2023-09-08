import React from 'react';

/**
 * 두 지점간의 거리 계산 함수
 *
 * @param lat1 지점 1 위도
 * @param lon1 지점 1 경도
 * @param lat2 지점 2 위도
 * @param lon2 지점 2 경도
 * @param unit 거리 표출단위(kilometer, meter)
 * @return
 */

export const GetDistanceBtw = (lat1: number, lon1: number, lat2: number, lon2: number, unit: string): number => {
  /**
   * 1000미만이면 소수점 없앤 정수 반환, 이상이면 km 소수점 1로 소수 반환 
   * @param m 미터를 기준
   * @returns 정수(--)m, 소수(--.-)km number타입으로 반환
   */
  const calculDistance = (m: number): number => {
    let meter;

    if (m < 1000) {
      meter = Math.floor(m);
    }
    if (m >= 1000) {
      meter = m / 1000;
      meter = Number(meter.toFixed(1));

      // if (meter % 1 === 0) meter = meter.toFixed(0);
    }
    return meter as number;
    // meter가 정수이면 m단위, 소수점이 있으면 km단위
    //(예외: 1.0km -> 1km로 바꾸는 작업 필요)
  };

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
  return calculDistance(dist);
};
