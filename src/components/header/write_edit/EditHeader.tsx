import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconAdd } from 'src/components/post/svg/IconAdd.svg';

const EditHeader = () => {
  //여기는 글 수정

  return (
    <S.TopBarMenuContainer>
      <S.AddButton type="submit">
        <S.AddText>공유하기</S.AddText>
        <S.AddIcon>
          <IconAdd />
        </S.AddIcon>
      </S.AddButton>
    </S.TopBarMenuContainer>
  );
};

export default EditHeader;

const S = {
  TopBarMenuContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    position: absolute;
    right: 16px;
  `,
  AddButton: styled.button`
    background: #d9d9d9;
    width: 110px;
    height: 34px;
    padding: 5px 15px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  `,

  AddText: styled.div`
    color: #000;

    /* button-medium */
    font-style: normal;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px; /* 150% */
  `,

  AddIcon: styled.div`
    width: 20px;
    height: 20px;
  `
};
