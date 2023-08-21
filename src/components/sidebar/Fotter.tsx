import React from 'react';
import { SideFotter, FotterContainer } from './StyledSideBar';

const Fotter = () => {
  return (
    <FotterContainer>
      <SideFotter>팀원 소개 · 이용약관 · 개인정보처리방침 </SideFotter>
      <div style={{ fontSize: '10px' }}>© 2023. SE7EN DAYS all rights reserved. </div>
    </FotterContainer>
  );
};

export default Fotter;
