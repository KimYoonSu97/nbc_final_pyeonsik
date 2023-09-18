import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FotterContainer>
      <SideFotter>팀원 소개 · 이용약관 · 개인정보처리방침 </SideFotter>
      <FooterCopyRight style={{ fontSize: '10px', marginBottom: '20px' }}>
        © 2023. SE7EN DAYS all rights reserved.
      </FooterCopyRight>
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
  color: var(--neutral-400, var(--neutral-400, #98a2b3));
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const FotterContainer = styled.div`
  margin-top: auto;

  width: 296px;
  border-top: 1px solid black;
`;

const FooterCopyRight = styled.div`
  margin-bottom: 20px;
  color: var(--neutral-600, #475467);
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;
