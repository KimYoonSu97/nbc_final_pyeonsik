import React from 'react';
import { FlexBoxCenter } from 'src/styles/styleBox';
import styled from 'styled-components';
import { IconReport } from '../icons';
import { useNavigate } from 'react-router';

const ReportIcon = () => {
  const navigate = useNavigate();

  return (
    <S.Container
      onClick={() => {
        navigate('/report');
      }}
    >
      <S.Icon>
        <IconReport />
      </S.Icon>
      <S.Title>고객센터</S.Title>
    </S.Container>
  );
};

export default ReportIcon;

const S = {
  Container: styled(FlexBoxCenter)`
    cursor: pointer;

    width: 74px;
    height: 74px;
    flex-direction: column;
    gap: 3px;
    position: fixed;
    background: #fff;
    border-radius: 60px;
    right: 16px;
    bottom: 90px;
    z-index: 9999999;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    color: var(--font-black, var(--Black, #242424));
    &:hover {
      color: var(--main, #f02826);
      background: #fff2f2;
    }
  `,
  Icon: styled.div``,
  Title: styled.div`
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 160% */
  `
};
