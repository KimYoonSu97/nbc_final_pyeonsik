import { atom, useAtom } from 'jotai';
import React, { useState } from 'react';
import { FlexBox, FlexBoxAlignCenter, FlexBoxJustifyCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import { IconConsent, IconConsentConfirm } from '../icons/register';

interface Consent {
  terms1Agreed: boolean;
  setTerms1Agreed: React.Dispatch<React.SetStateAction<boolean>>;
  terms2Agreed: boolean;
  setTerms2Agreed: React.Dispatch<React.SetStateAction<boolean>>;
}

const TermsAndConditions = ({ terms1Agreed, setTerms1Agreed, terms2Agreed, setTerms2Agreed }: Consent) => {
  const toggleAllAgree = () => {
    if (terms1Agreed && terms2Agreed) {
      setTerms1Agreed(false);
      setTerms2Agreed(false);
    } else {
      setTerms1Agreed(true);
      setTerms2Agreed(true);
    }
  };
  const toggle1Agreed = () => {
    setTerms1Agreed(!terms1Agreed);
  };
  const toggle2Agreed = () => {
    setTerms2Agreed(!terms2Agreed);
  };

  return (
    <S.Container>
      <S.AllCheckArea onClick={toggleAllAgree}>
        {terms1Agreed && terms2Agreed ? <IconConsentConfirm /> : <IconConsent />}
        전체 동의합니다.
      </S.AllCheckArea>
      <S.ConsentArea>
        <S.CheckConsent>
          {terms1Agreed ? <IconConsentConfirm onClick={toggle1Agreed} /> : <IconConsent onClick={toggle1Agreed} />}
          <p onClick={toggle1Agreed}>편식 서비스 이용 약관동의 (필수)</p>
          <S.PostButton>보기</S.PostButton>
        </S.CheckConsent>
        <S.CheckConsent>
          {terms2Agreed ? <IconConsentConfirm onClick={toggle2Agreed} /> : <IconConsent onClick={toggle2Agreed} />}
          <p onClick={toggle2Agreed}>개인정보 수집 및 이용 동의 (필수)</p>
          <S.PostButton>보기</S.PostButton>
        </S.CheckConsent>
      </S.ConsentArea>
    </S.Container>
  );
};

export default TermsAndConditions;

const S = {
  Container: styled(FlexBoxJustifyCenter)`
    flex-direction: column;
    margin-top: 44px;
  `,
  AllCheckArea: styled(FlexBoxAlignCenter)`
    width: 294px;
    height: 42px;
    border-radius: 4px;
    background: var(--Neutral-50, #f9fafb);
    padding: 9px 12px;
    gap: 10px;
    cursor: pointer;

    color: var(--font-black, var(--Black, #242424));
    ${styleFont.labelLarge}
  `,
  ConsentArea: styled(FlexBox)`
    flex-direction: column;
    margin-top: 8px;
    margin-bottom: 8px;
    gap: 12px;
  `,
  CheckConsent: styled(FlexBoxAlignCenter)`
    width: 294px;
    height: 24px;
    padding: 0 12px;
    /* margin: 8px 0; */
    color: var(--font-black, var(--Black, #242424));
    ${styleFont.labelLarge}
    font-size: 14px;
    font-weight: 400;
    gap: 10px;
    cursor: pointer;
  `,
  PostButton: styled.div`
    margin-left: auto;
    color: #4285f4;
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 145.455% */
    text-decoration-line: underline;
    cursor: pointer;
  `
};

const TermsCheckbox = styled.input`
  /* 체크박스 스타일링 */
  margin-right: 8px;
`;

const TermsModal = styled.div`
  /* 모달 배경 스타일링 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  /* 모달 내용 스타일링 */
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AllAgreeLabel = styled.label`
  /* 모달 내용 스타일링 */
  background-color: white;

  font-weight: bold;
`;
