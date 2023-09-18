import React, { useEffect, useState } from 'react';
import 'react-kakao-maps-sdk';
import { ConvsInform } from 'src/types/types';
import { GetConvList } from './GetConvList';
import styled from 'styled-components';
import { CU, Emart24, GS25, IconMap, SevenEleven } from 'src/components/icons';
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
  const [myLat, setMyLat] = useState<number | null>(null);
  const [myLng, setMyLng] = useState<number | null>(null);

  const [nearConv, setNearConv] = useState<ConvsInform>();
  const [Logo, setLogo] = useState<React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null>(null);

  const setMyPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        setMyLat(lat);
        setMyLng(lng);
      });
    } else {
      setMyLat(37);
      setMyLng(127);
    }
  };

  useEffect(() => {
    setMyPosition();
  }, []);

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

  const findClosest = () => {
    if (convs.length === 0) {
    } else {
      let closestConv = convs.find((v) => v.distance > 0);
      if (!closestConv) closestConv = convs[0];

      for (let i = 0; i < convs.length; i++) {
        if (convs[i].distance <= 0) continue;
        if (convs[i].distance < closestConv.distance) {
          closestConv = convs[i];
        }
      }
      setNearConv(closestConv);
      setLogoFn(closestConv.brand_name);
    }
  };
  useEffect(() => {
    findClosest();
  }, [convs]);

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
        setLogo(null);
    }
  };

  return (
    <S.Container>
      {nearConv && (
        <>
          <S.Title>지금 나랑 가장 가까운 편의점은?</S.Title>
          {nearConv.distance ? (
            <>
              <S.LocationButton
                to={`https://map.kakao.com/link/map/${nearConv?.full_name},${myLat},${myLng}`}
                target="_blank"
              >
                <S.IconBox>
                  <IconMap />
                </S.IconBox>
                위치 보기
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
  );
};

export default KakaoMap;

const S = {
  Container: styled(FlexBoxCenter)`
    padding: 16px 8px 0 8px;
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
    padding: 7px 0;
    background: var(--main, #f02826);
    color: #fff;
    margin-bottom: 15px;
    ${styleFont.buttonSmall}
  `,
  IconBox: styled(FlexBoxCenter)`
    margin-right: 2px;
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
    line-height: 20px;
  `,
  Distance: styled.p`
    margin-left: 4px;
    color: var(--neutral-400, #98a2b3);
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  `,
  NearByBrand: styled(FlexBoxAlignCenter)`
    flex-direction: column;
    gap: 8px;
    margin: 16px 0px 12px 0px;
  `,
  NoStore: styled.div`
    color: var(--font-black, var(--Black, #242424));
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    white-space: pre-line;
  `
};
