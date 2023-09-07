import React, { useEffect, useState } from 'react';
import 'react-kakao-maps-sdk';
import { useGeoLocation } from './useGeoLocation';
import { GetDistanceBtw } from './GetDistanceBtw';
import { GetDetailAddress } from './GetDetailAddress';
import { LocInform } from 'src/types/types';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const { location, error } = useGeoLocation();

  const [convs, setConvs] = useState<LocInform[]>([]);
  const [curLoc, setCurLoc] = useState<string>();

  if (error) {
    console.log(error);
  }

  const ps = new kakao.maps.services.Places();
  // 카테고리로 편의점을 검색합니다

  useEffect(() => {
    if (location) {
      ps.categorySearch(
        'CS2',
        (data, status, _pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            // let markers = [];

            for (var i = 0; i < 3; i++) {
              // 새로운 데이터를 생성
              const newConv: LocInform = {
                position: {
                  lat: data[i].y,
                  lng: data[i].x
                },
                content: data[i].place_name
              };

              // 이전 convs 배열에 새로운 데이터를 추가
              setConvs((prevConvs) => [...prevConvs, newConv]);
            }
          }
        },
        {
          location: new kakao.maps.LatLng(location?.position.lat as number, location?.position.lng as number),
          // useMapCenter: true,
          size: 15,
          radius: 5000,
          sort: kakao.maps.services.SortBy.DISTANCE
          // 왜냐
        }
      );
      // 시 주소를 받아옵니다.
      // GetDetailAddress 함수를 호출하는 함수
      async function getAddressAndUse() {
        const latitude = 37.123456; // 위도
        const longitude = 127.654321; // 경도

        try {
          const address = await GetDetailAddress(latitude, longitude); // 여기에 원하는 위경도
          if (address) {
            console.log('주소:', address);
            // 여기에서 주소 값을 사용하면 됩니다.
          } else {
            console.log('주소를 찾을 수 없습니다.');
          }
        } catch (error) {
          console.error('에러 발생:', error);
        }
      }
      getAddressAndUse();
    }
  }, [location]);

  return (
    <>
      <div>위도:{location?.position.lat}</div>
      <div>경도:{location?.position.lng}</div>
      <br />
      <div>{curLoc}</div>
      <br />

      <div className="conv-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {convs.map((conv, index) => (
          <div key={index} className="conv-item">
            <div>위도: {conv.position.lat}</div>
            <div>경도: {conv.position.lng}</div>
            <div>내용: {conv.content}</div>
            <div>
              거리차이:{' '}
              {GetDistanceBtw(
                location?.position.lat as number,
                location?.position.lng as number,
                conv.position.lat as number,
                conv.position.lng as number,
                'kilometer'
              ).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      {/* <button>위치보기</button> */}
    </>
  );
};

export default KakaoMap;
