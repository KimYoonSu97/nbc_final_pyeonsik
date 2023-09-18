export const GetDetailAddress = (lat: any, lng: any, callback: (address: string | undefined) => void): void => {
  const geocoder = new kakao.maps.services.Geocoder();
  const coord = new kakao.maps.LatLng(lat, lng);

  geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: string) => {
    if (status === kakao.maps.services.Status.OK) {
      const address = result[0].address.region_2depth_name;
      callback(address);
    } else {
      callback(undefined);
    }
  });
};
