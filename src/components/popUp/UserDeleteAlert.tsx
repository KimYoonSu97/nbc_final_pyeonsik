import React from 'react';
import styled from 'styled-components';
import { confirmAlert, ReactConfirmAlertProps } from 'react-confirm-alert';
import { FlexBox, FlexBoxAlignCenter, FlexBoxCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import AchievementModal from '../mypage/AchievementModal';

const UserDeleteAlert = (type: string) => {
  return new Promise<boolean>((resolve, reject) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <>
            <S.Container>
              <S.ConfirmBox>
                <S.Title>탈퇴가 완료되었습니다.</S.Title>
                <S.Description>
                  {'그동안 이용해 주셔서 감사합니다.\n언제든 다시 오셔서\n맛있는 편식 조합을 공유해 주세요!'}
                </S.Description>
                <S.ButtonArea>
                  <S.Button
                    as="button"
                    $type={type}
                    onClick={() => {
                      resolve(true);
                      onClose();
                    }}
                  >
                    홈으로 돌아가기
                  </S.Button>
                </S.ButtonArea>
              </S.ConfirmBox>
            </S.Container>
            <S.Background
              onClick={() => {
                resolve(true);
                onClose();
              }}
            />
          </>
        );
      },
      closeOnClickOutside: false,
      closeOnEscape: false
    });
  });
};

export default UserDeleteAlert;

const ButtonBasic = styled(FlexBoxCenter)`
  width: 122px;
  height: 36px;
  border-radius: 6px;
  text-align: center;
`;
interface ButtonProps {
  $type: string;
}

const S = {
  Container: styled.div`
    position: fixed;
    top: 0;
    right: 0;
    z-index: 102;
    overflow: hidden;
  `,
  Background: styled(FlexBoxCenter)`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    z-index: 101;
    padding: 30px;
  `,
  ConfirmBox: styled(FlexBoxCenter)`
    width: 400px;
    height: 300px;
    border-radius: 10px;
    background: #fff;

    padding: 30px;

    position: fixed;
    top: calc((100vh - 274px) / 2);
    right: calc((100vw - 400px) / 2);
    z-index: 103;
    flex-direction: column;
  `,
  Title: styled.p`
    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    margin-bottom: 30px;
  `,
  Caption: styled.p`
    color: var(--font-black, var(--Black, #242424));
    text-align: center;
    white-space: pre-line;
    ${styleFont.bodyLarge};
    font-weight: 700;
  `,

  Description: styled.p`
    color: var(--font-black, var(--Black, #242424));
    text-align: center;
    white-space: pre-line;
    margin-bottom: 26px;

    ${styleFont.bodyLarge};
  `,
  ButtonArea: styled(FlexBox)`
    cursor: pointer;
  `,
  Button: styled(ButtonBasic)<ButtonProps>`
    background: var(--Black, #242424);
    color: #fff;
    ${styleFont.buttonSmall}
    cursor: pointer;
  `,
  Badge: styled(FlexBoxCenter)`
    width: 140px;
    height: 140px;
    position: absolute;
    top: -70px;
  `
};
