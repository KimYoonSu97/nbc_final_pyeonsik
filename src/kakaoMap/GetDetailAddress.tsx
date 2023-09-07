export const GetDetailAddress = async (lat: any, lng: any): Promise<string | undefined> => {
  return new Promise<string | undefined>((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);

    const callback = function (result: any, status: string) {
      if (status === kakao.maps.services.Status.OK) {
        const arr = { ...result };
        const address = arr[0].address.region_2depth_name; // 현재 위치 ((서울)시)
        console.log(address);
        resolve(address);
      } else {
        // 에러 처리 로직을 추가할 수도 있습니다.
        reject(new Error('주소 변환 실패'));
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  });
};