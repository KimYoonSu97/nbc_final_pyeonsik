import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Title, ReportButton } from './utility/CommonStyles';
import { useAtom } from 'jotai';
import { stepAtom } from 'src/globalState/jotai';

const ReportStep4 = () => {
  const navigate = useNavigate();
  const [, setStep] = useAtom(stepAtom);

  return (
    <S.ReportInner>
      <S.Title>
        제보해 주셔서 감사합니다.
        <br />
        빠른 시일 내에 문제를 해결하겠습니다.
      </S.Title>
      <S.ReportButton
        onClick={() => {
          navigate('/');
          // window.location.reload();
          setStep(1)
        }}
      >
        메인 화면으로 돌아가기
      </S.ReportButton>
    </S.ReportInner>
  );
};

export default ReportStep4;

const S = {
  ReportInner: styled.div``,
  Title: styled(Title)`
    margin-bottom: 34px;
  `,
  ReportButton: styled(ReportButton)`
    background-color: #f02826;
    letter-spacing: -1px;
  `
};
