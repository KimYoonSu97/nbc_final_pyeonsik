import React from 'react';

import KakaoSearchMap from './KakaoSearchMap';

const KakaoMap = () => {
  return (
    <>
      <KakaoSearchMap />
    </>
  );
};

export default KakaoMap;

// const [state, setState] = useState({
//   center: {
//     lat: 33.450701,
//     lng: 126.570667
//   },
//   errMsg: '',
//   isLoading: true
// });

// const moveToUserLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setState((prev) => ({
//           ...prev,
//           center: {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           }
//         }));
//       },
//       (err) => {
//         console.error(err);
//       }
//     );
//   }
// };

// <>
//   <Map
//     center={state.center}
//     style={{
//       width: '100%',
//       height: '450px',
//       border: '1px solid black'
//     }}
//     level={3}
//   >
//     <MapMarker position={state.center}>
//       <div style={{ padding: '5px', color: '#000' }}>{state.errMsg ? state.errMsg : '여기에 계신가요?!'}</div>
//     </MapMarker>
//   </Map>
//   <button onClick={searchFromHereHandler}>이 위치에서 다시 검색</button>
//   <button onClick={moveToUserLocation} className="web">
//     내 위치로 이동
//   </button>
//   {/* <KakaoSearchMap /> */}
