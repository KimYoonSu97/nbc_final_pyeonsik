import React from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { CU, Emart24, GS25, SevenEleven } from 'src/components/icons';
import { styleFont } from 'src/styles/styleFont';
import { FlexBoxAlignCenter } from 'src/styles/styleBox';

export const brands = [
  {
    name: 'GS25',
    path: '?=GS25',
    logoImg: <GS25 />,
    color: '#2ABADA'
  },
  {
    name: 'SEVEN ELEVEN',
    path: '?=7-ELEVEn',
    logoImg: <SevenEleven />,
    color: '#008061'
  },
  {
    name: 'E-MART24',
    path: '?=emart24',
    logoImg: <Emart24 />,
    color: '#FFB81C'
  },
  {
    name: 'CU',
    path: '?=CU',
    logoImg: <CU />,
    color: '#652F8D'
  }
];

const BrandSelector = () => {
  const location = useLocation();
  return (
    <S.Container>
      <S.TapButton to={'event'} $type={''} $location={location.search}>
        행사 상품 전체 보기
      </S.TapButton>
      {brands.map((brand) => {
        return (
          <S.TapButton key={brand.name} to={`event${brand.path}`} $type={brand.path} $location={location.search}>
            <S.Icon>{brand.logoImg}</S.Icon>
          </S.TapButton>
        );
      })}
    </S.Container>
  );
};

export default BrandSelector;

type Props = {
  $location: string;
  $type: string;
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 10px;
  `,

  Icon: styled(FlexBoxAlignCenter)`
    padding: 10px 0;
    /* width: 20px; */
    /* height: 20px; */
    margin-right: 4px;
  `,

  TapButton: styled(Link)<Props>`
    display: flex;
    align-items: center;
    padding: 10px 12px;
    ${styleFont.labelLarge}
    border-radius: 10px;
    text-decoration: none;
    color: black;
    cursor: pointer;
    ${(props) =>
      props.$type === props.$location &&
      css`
        background: var(--neutral-100, #f2f4f7);
      `}
    &:hover {
      background: var(--neutral-100, #f2f4f7);
    }
  `
};
