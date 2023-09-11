import React from 'react';
import styled from 'styled-components';
import { FlexBoxCenter, FlexBoxAlignCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import { ConvsInform } from 'src/types/types';
import { Link } from 'react-router-dom';

interface Props {
  brand: ConvsInform;
}

const NearByBox = ({ brand }: Props) => {
  return (
    <S.StoreContainer>
      <S.LeftBox>
        <S.Dot $brand={brand.brand_name} />
        <S.StoreNameDot>{brand.brand_name}</S.StoreNameDot>
      </S.LeftBox>
      {brand.distance ? (
        <S.RightBox>
          <S.StoreLocationDistanceBox>
            <S.StoreLocation
              to={`https://map.kakao.com/link/map/${brand.full_name},${brand.position.lat},${brand.position.lng}`}
            >
              위치보기
            </S.StoreLocation>
            <S.StoreDistance>
              약 {Math.floor(brand.distance) === brand.distance ? brand.distance + 'm' : brand.distance + 'km'}
            </S.StoreDistance>
          </S.StoreLocationDistanceBox>
          <S.StoreBoxName>{brand.position_name}</S.StoreBoxName>
        </S.RightBox>
      ) : (
        <S.RightBox>
          <S.NoStore>가까운 지점을 찾을 수 없어요.</S.NoStore>
        </S.RightBox>
      )}
    </S.StoreContainer>
  );
};

export default NearByBox;
interface ColorProps {
  $brand: string;
}

const S = {
  StoreContainer: styled(FlexBoxAlignCenter)`
    width: 280px;
    height: 60px;
    position: relative;
  `,
  StoreNameDot: styled(FlexBoxCenter)`
    color: var(--font-black, var(--Black, #242424));
    ${styleFont.bodyLarge}
  `,
  Dot: styled.div<ColorProps>`
    border-radius: 100px;
    width: 10px;
    height: 10px;
    margin-right: 8px;
    background-color: ${(props) => {
      switch (props.$brand) {
        case 'CU':
          return '#652F8D';
        case 'GS25':
          return '#2ABADA';
        case '이마트24':
          return '#FFB81C';
        case '세븐일레븐':
          return '#008061';
        case '미니스톱':
          return '#1864A7';
      }
    }};
  `,
  LeftBox: styled(FlexBoxAlignCenter)`
    padding: 18px 0 18px 16px;
  `,
  RightBox: styled.div`
    position: absolute;
    left: 130px;
  `,
  StoreLocationDistanceBox: styled(FlexBoxAlignCenter)``,
  StoreLocation: styled(Link)`
    text-decoration: none;
    height: 16px;
    padding: 0 5px;
    color: #fff;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 160% */
    border-radius: 100px;
    background: var(--neutral-400, #98a2b3);
    margin-right: 4px;
  `,
  StoreDistance: styled.div`
    color: var(--neutral-500, #667085);
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 145.455% */
  `,
  StoreBoxName: styled.div`
    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
  `,
  NoStore: styled.div`
    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
  `
};
