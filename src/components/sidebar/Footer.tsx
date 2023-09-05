import React from 'react';
// import { SideFotter, FotterContainer } from './StyledSideBar';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FotterContainer>
      <SideFotter>팀원 소개 · 이용약관 · 개인정보처리방침 </SideFotter>
      {/* 아래 스타일에서  marginBottom: '20px' 제거 */}
      <div style={{ fontSize: '10px', marginBottom: '20px' }}>© 2023. SE7EN DAYS all rights reserved. </div>
    </FotterContainer>
  );
};

export default Footer;

export const SideFotter = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 10px;
  width: 182px;
  cursor: pointer;
`;

export const FotterContainer = styled.div`
  /* position: absolute; */
  /* bottom: 0; */
  margin-top: auto;
  /* position: fixed; */
  /* right: calc(((100vw - 1280px) / 2) + 16px); */
  width: 296px;
  border-top: 1px solid black;
  /* margin-top: auto; */
`;
