//  상세주소 받아옵니다. 하지만 사용 안하는...
export const GetDetailAddress = (lat: any, lng: any, callback: (address: string | undefined) => void): void => {
  const geocoder = new kakao.maps.services.Geocoder();
  const coord = new kakao.maps.LatLng(lat, lng);

  geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: string) => {
    if (status === kakao.maps.services.Status.OK) {
      const address = result[0].address.region_2depth_name; // ex) 현재 위치 ((서울)시)
      callback(address);
    } else {
      callback(undefined); // 에러 처리를 콜백으로 전달
    }
  });
};
