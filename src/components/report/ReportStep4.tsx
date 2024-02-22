import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const ReportStep4 = () => {
  const navigate = useNavigate();

  return (
    <S.ReportInner>
      <h3 className="reportEnd">
        제보해 주셔서 감사합니다.
        <br />
        빠른 시일 내에 문제를 해결하겠습니다.
      </h3>
      <button
        className="goHome"
        onClick={() => {
          navigate('/');
          window.location.reload();
        }}
      >
        메인 화면으로 돌아가기
      </button>
    </S.ReportInner>
  );
};

export default ReportStep4;

const S = {
  ReportInner: styled.div`
    .reportEnd {
      font-size: 24px;
      font-weight: bold;
      line-height: 32px;
      letter-spacing: -1.5px;
      margin-bottom: 34px;
      margin-bottom: 40px;
    }
    .goHome {
      width: 210px;
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
      border-radius: 5px;
      color: #fff;
      background-color: #f02826;
      letter-spacing: -1px;
    }
  `
};
