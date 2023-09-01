import React, { useEffect, useState } from 'react';

import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const KakaoSearchMap = () => {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [place, setPlace] = useState('이태원');
  const [status, setStatus] = useState('');

  const { kakao } = window;

  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667
    },
    errMsg: null,
    isLoading: true
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude // 경도
            },
            isLoading: false
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false
      }));
    }
  }, []);

  // TODO: 현재 근처 편의점 5개 가져오기, 맵 드래그해도 동일 -> ps.category

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    // TODO: 마커 클릭시 그 위치로
    ps.keywordSearch(`${place} 편의점`, (data, status, _pagination) => {
      setStatus(status);
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < 5; i++) {
          markers.push({
            position: {
              lat: data[i]?.y,
              lng: data[i]?.x
            },
            content: data[i]?.place_name
          });

          bounds.extend(new kakao.maps.LatLng(data[i]?.y, data[i]?.x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [place]);

  const placeInputHandler = (e) => {
    setPlace(e.target.value);
  };

  return (
    <>
      <Map // 로드뷰를 표시할 Container
        center={state.center}
        style={{
          width: '100%',
          height: '350px'
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <>
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
            >
              <a
                href={`https://map.kakao.com/link/map/${marker.content},${marker.position.lat},${marker.position.lng}`}
                style={{ color: 'blue' }}
                target="_blank"
                rel="noreferrer"
              >
                큰지도보기
              </a>
              <a
                href={`https://map.kakao.com/link/to/${marker.content},${marker.position.lat},${marker.position.lng}`}
                style={{ color: 'blue' }}
                target="_blank"
                rel="noreferrer"
              >
                길찾기
              </a>
              <div style={{ color: '#000' }}>{marker.content}</div>
            </MapMarker>
            {!state.isLoading && (
              <MapMarker position={state.center}>
                <div style={{ padding: '5px', color: '#000' }}>{state.errMsg ? state.errMsg : '여기에 계신가요?!'}</div>
              </MapMarker>
            )}
            <ListContainer>
              <ListItem>{marker.content}</ListItem>
            </ListContainer>
          </>
        ))}
        {/* 확대/축소 토글 */}
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      </Map>
      <input placeholder="장소 입력" onChange={placeInputHandler}></input>
      {/* TODO 현재 사용자 위치로 이동 */}
    </>
  );
};

export default KakaoSearchMap;

const ListContainer = styled.div`
  background-color: #f0f0f0;
  padding: 16px;
  border-radius: 8px;
`;

// 스타일 컴포넌트를 사용하여 목록 아이템 스타일링
const ListItem = styled.div`
  background-color: #fff;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
