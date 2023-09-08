import React, { useEffect, useMemo, useState } from 'react';
import 'react-kakao-maps-sdk';
import { ConvsInform } from 'src/types/types';
import { GetConvList } from './GetConvList';
import styled from 'styled-components';
import { CU, Emart24, GS25, SevenEleven } from 'src/components/icons';

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
  const coloredBalls = ['🟢', '🟣', '🔵', '🟡', '🟠'];

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
      // 현재위치를 알 수 없는 경우, 기본 값을 설정합니다.
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

          // console.log(convList);
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
      console.log('가장 가까운 conv:', closestConv);
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
        <S.Title>지금 나랑 가장 가까운 편의점은?</S.Title>

        <S.ContentContainer>
          {nearConv && (
            <>
              <S.ColumnContainer>
                {Logo && <Logo />}
                <S.RowContainer>
                  <S.Content>{nearConv.position_name}</S.Content>
                  <S.DetailContent>
                    {Math.floor(nearConv.distance) === nearConv.distance
                      ? nearConv.distance + 'm'
                      : nearConv.distance + 'km'}
                  </S.DetailContent>
                </S.RowContainer>
              </S.ColumnContainer>
            </>
          )}
        </S.ContentContainer>
        <S.HugeButton href={`https://map.kakao.com/link/map/${nearConv?.full_name},${myLat},${myLng}`} target="_blank">
          위치보기
        </S.HugeButton>
      </S.Container>

      <S.ListsContainer>
        {convs.map((v, idx) => (
          <div key={idx}>
            {!(v.distance === 0) ? (
              <>
                <S.ListContainer>
                  <S.Title>
                    {coloredBalls[idx]} {v.brand_name}
                  </S.Title>
                  <S.ColumnContainer>
                    <S.RowContainer>
                      <S.PositionLink
                        href={`https://map.kakao.com/link/map/${v.full_name},${v.position.lat},${v.position.lng}`}
                        target="_blank"
                      >
                        <span className="material-symbols-outlined">arrow_outward</span>위치보기
                      </S.PositionLink>
                      <S.DetailContent>
                        {Math.floor(v.distance) === v.distance ? v.distance + 'm' : v.distance + 'km'}
                      </S.DetailContent>
                    </S.RowContainer>
                    <S.Content>{v.position_name}</S.Content>
                  </S.ColumnContainer>
                </S.ListContainer>
                <S.Separator />
              </>
            ) : (
              <>
                <S.ListContainer>
                  <S.Title>⚫ {v.brand_name}</S.Title>
                  <S.ColumnContainer>값이 없습니다 😥</S.ColumnContainer>
                </S.ListContainer>
                <S.Separator />
              </>
            )}
          </div>
        ))}
      </S.ListsContainer>
    </>
  );
};

export default KakaoMap;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;

    width: 500px;
    margin: 0 auto;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
  `,
  ListsContainer: styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
  `,
  ListContainer: styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
  `,
  RowContainer: styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
  `,
  ColumnContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
  `,
  ContentContainer: styled.div`
    display: flex;
    flex-direction: row;
    width: 450px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #d2d2d2;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
  `,

  Title: styled.div`
    font-weight: bolder;
    font-size: 24px; /* 큰 텍스트 크기 */
    text-align: center; /* 가운데 정렬 */
    margin: 10px 0px;
  `,

  Content: styled.div`
    font-size: 18px;
    text-align: center; /* 가운데 정렬 */
    font-weight: bolder;
  `,
  DetailContent: styled.div`
    font-size: 13px;
    text-align: center; /* 가운데 정렬 */
    color: #919191;
    margin: 0px 5px;
  `,
  HugeButton: styled.a`
    padding: 12px 20px;
    background-color: black;
    color: #fff;
    border: none;
    cursor: pointer;
    text-align: center; /* 가운데 정렬 */
    border-radius: 15px;
    font-weight: bolder;
    text-decoration: none;
    height: 45px;
    margin: 0px 10px;
  `,
  PositionLink: styled.a`
    padding: 2px 5px;
    background-color: #707070;
    color: #fff;
    border: none;
    cursor: pointer;
    text-align: center; /* 가운데 정렬 */
    border-radius: 15px;
    font-weight: bolder;
    text-decoration: none;
  `,

  Separator: styled.hr`
    border-top: 3px solid #434343;
    margin: 10px 0;
  `
};
