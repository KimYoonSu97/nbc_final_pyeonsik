import React from 'react';
import { SideFotter, FotterContainer } from './StyledSideBar';

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
