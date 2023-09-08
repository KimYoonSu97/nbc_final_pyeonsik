import React, { useEffect, useMemo, useState } from 'react';
import 'react-kakao-maps-sdk';
import { ConvsInform } from 'src/types/types';
import { GetConvList } from './GetConvList';
import styled from 'styled-components';
import { CU, Emart24, GS25, SevenEleven } from 'src/components/icons';
import { styleFont } from 'src/styles/styleFont';
import { FlexBoxAlignCenter, FlexBoxCenter } from 'src/styles/styleBox';
import NearByBox from 'src/components/sidebar/event/NearByBox';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const [convs, setConvs] = useState<ConvsInform[]>([]);
  const [myLat, setMyLat] = useState<number | null>(null); // 위도 상태 변수
  const [myLng, setMyLng] = useState<number | null>(null); // 경도 상태 변수

  const [nearConv, setNearConv] = useState<ConvsInform>();
  const [Logo, setLogo] = useState<React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null>(null);

  // 현재 자신의 위치 좌표를 지정해줍니다.
  const setMyPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        setMyLat(lat);
        setMyLng(lng);
      });
    } else {
      setMyLat(37); // 서울 위도
      setMyLng(127); // 서울 경도
    }
  };

  useEffect(() => {
    setMyPosition();
  }, []);

  // 위치가 변경될 때마다 주변 편의점 리스트를 가져옵니다.
  useEffect(() => {
    if (myLat !== null && myLng !== null) {
      const fetchData = async () => {
        try {
          const convList = await GetConvList(myLat, myLng);
          setConvs(convList);
        } catch (error) {
          console.error('편의점 리스트 가져오기 오류:', error);
        }
      };
      fetchData();
    }
  }, [myLat, myLng]);

  // 편의점 리스트 중 가장 가까운 편의점을 찾습니다.
  const findClosest = () => {
    if (convs.length === 0) {
      console.log('배열이 비어있습니다.');
    } else {
      let closestConv = convs.find((v) => v.distance > 0); // 초기값으로 값이 있는 원소
      if (!closestConv) closestConv = convs[0];

      for (let i = 0; i < convs.length; i++) {
        if (convs[i].distance <= 0) continue; // 빈 값이면 패스
        if (convs[i].distance < closestConv.distance) {
          closestConv = convs[i]; // 더 작은 distance를 가진 원소로 업데이트
        }
      }
      setNearConv(closestConv);
      setLogoFn(closestConv.brand_name);
    }
  };
  useEffect(() => {
    findClosest();
  }, [convs]);

  // 브랜드명에 따라 로고를 지정해줍니다.
  const setLogoFn = (brandName: string) => {
    switch (brandName) {
      case 'CU': {
        setLogo(CU);
        break;
      }
      case '이마트24': {
        setLogo(Emart24);
        break;
      }
      case 'GS25': {
        setLogo(GS25);
        break;
      }
      case '세븐일레븐': {
        setLogo(SevenEleven);
        break;
      }
      default:
        // 예외 처리: 알 수 없는 브랜드명일 경우
        setLogo(null);
    }
  };

  return (
    <>
      <S.Container>
        {nearConv && (
          <>
            <S.Title>지금 나랑 가장 가까운 편의점은?</S.Title>
            {nearConv.distance ? (
              <>
                <S.LocationButton to={`https://map.kakao.com/link/map/${nearConv?.full_name},${myLat},${myLng}`}>
                  위치보기
                </S.LocationButton>
                <S.NearByStore>
                  <S.NearByLogo> {Logo && <Logo />}</S.NearByLogo>
                  <S.StoreInfo>
                    <S.StoreName>{nearConv.position_name}</S.StoreName>
                    <S.Distance>
                      {Math.floor(nearConv.distance) === nearConv.distance
                        ? nearConv.distance + 'm'
                        : nearConv.distance + 'km'}
                    </S.Distance>
                  </S.StoreInfo>
                </S.NearByStore>
              </>
            ) : (
              <S.NearByStore>
                <S.NoStore>{'반경 5km 내\n가까운 편의점이 없습니다.'}</S.NoStore>
              </S.NearByStore>
            )}
          </>
        )}
        <S.NearByBrand>
          {convs
            .filter((item) => {
              return item.brand_name !== nearConv?.brand_name;
            })
            .map((item, index) => {
              return <NearByBox key={index} brand={item} />;
            })}
        </S.NearByBrand>
      </S.Container>
    </>
  );
};

export default KakaoMap;

const S = {
  Container: styled(FlexBoxCenter)`
    padding: 16px 8px 0 8px;
    /* background-color: royalblue; */
    flex-direction: column;
  `,
  Title: styled.p`
    color: var(--font-black, var(--Black, #242424));
    ${styleFont.titleSmall}
    margin-bottom: 8px;
  `,
  LocationButton: styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    text-decoration: none;
    width: 280px;
    /* height: 30px; */
    padding: 7px 0;
    background: var(--main, #f02826);
    color: #fff;
    margin-bottom: 15px;
    ${styleFont.buttonSmall}
  `,
  NearByStore: styled(FlexBoxCenter)`
    width: 280px;
    height: 76px;
    background: var(--neutral-100, #f2f4f7);
    border-radius: 10px;
    flex-direction: column;
  `,
  NearByLogo: styled.div`
    margin-bottom: 11px;
    height: 20px;
  `,
  StoreInfo: styled(FlexBoxAlignCenter)``,
  StoreName: styled.p`
    color: var(--font-black, var(--Black, #242424));
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
  `,
  Distance: styled.p`
    margin-left: 4px;
    color: var(--neutral-400, #98a2b3);
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 145.455% */
  `,
  NearByBrand: styled(FlexBoxAlignCenter)`
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
  `,
  NoStore: styled.div`
    color: var(--font-black, var(--Black, #242424));
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
    white-space: pre-line;
  `
};

// const S = {
//   Container: styled.div`
//     display: flex;
//     flex-direction: column;

//     width: 500px;
//     margin: 0 auto;
//     padding: 15px;
//     border: 1px solid #ccc;
//     border-radius: 8px;
//   `,
//   ListsContainer: styled.div`
//     margin-top: 30px;
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     justify-content: center; /* 가로 중앙 정렬 */
//     align-items: center; /* 세로 중앙 정렬 */
//   `,
//   ListContainer: styled.div`
//     display: flex;
//     flex-direction: row;
//     gap: 10px;
//     justify-content: center; /* 가로 중앙 정렬 */
//     align-items: center; /* 세로 중앙 정렬 */
//   `,
//   RowContainer: styled.div`
//     display: flex;
//     flex-direction: row;
//     gap: 10px;
//     justify-content: center; /* 가로 중앙 정렬 */
//     align-items: center; /* 세로 중앙 정렬 */
//   `,
//   ColumnContainer: styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     justify-content: center; /* 가로 중앙 정렬 */
//     align-items: center; /* 세로 중앙 정렬 */
//   `,
//   ContentContainer: styled.div`
//     display: flex;
//     flex-direction: row;
//     width: 450px;
//     margin: 0 auto;
//     padding: 20px;
//     border: 1px solid #ccc;
//     border-radius: 8px;
//     background-color: #d2d2d2;
//     justify-content: center; /* 가로 중앙 정렬 */
//     align-items: center; /* 세로 중앙 정렬 */
//   `,

//   Title: styled.div`
//     font-weight: bolder;
//     font-size: 24px; /* 큰 텍스트 크기 */
//     text-align: center; /* 가운데 정렬 */
//     margin: 10px 0px;
//   `,

//   Content: styled.div`
//     font-size: 18px;
//     text-align: center; /* 가운데 정렬 */
//     font-weight: bolder;
//   `,
//   DetailContent: styled.div`
//     font-size: 13px;
//     text-align: center; /* 가운데 정렬 */
//     color: #919191;
//     margin: 0px 5px;
//   `,
//   HugeButton: styled.a`
//     padding: 12px 20px;
//     background-color: black;
//     color: #fff;
//     border: none;
//     cursor: pointer;
//     text-align: center; /* 가운데 정렬 */
//     border-radius: 15px;
//     font-weight: bolder;
//     text-decoration: none;
//     height: 45px;
//     margin: 0px 10px;
//   `,
//   PositionLink: styled.a`
//     padding: 2px 5px;
//     background-color: #707070;
//     color: #fff;
//     border: none;
//     cursor: pointer;
//     text-align: center; /* 가운데 정렬 */
//     border-radius: 15px;
//     font-weight: bolder;
//     text-decoration: none;
//   `,

//   Separator: styled.hr`
//     border-top: 3px solid #434343;
//     margin: 10px 0;
//   `
// };
