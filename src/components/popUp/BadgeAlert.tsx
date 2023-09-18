import React from 'react';
import styled from 'styled-components';
import { confirmAlert, ReactConfirmAlertProps } from 'react-confirm-alert';
import { FlexBox, FlexBoxAlignCenter, FlexBoxCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import AchievementModal from '../mypage/AchievementModal';

interface AchievementType {
  component: JSX.Element;
  name: string;
  description: string;
}

const BadgeAlert = (type: string) => {
  const text = AchievementModal(type);

  return new Promise<boolean>((resolve, reject) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <>
            <S.Container>
              <S.ConfirmBox>
                <S.Badge>{text.component}</S.Badge>
                <S.Title>야호! 뱃지를 획득했어요!</S.Title>
                <S.Caption>{text.name}</S.Caption>
                <S.Description>{text.description}</S.Description>
                <S.ButtonArea>
                  <S.Button
                    as="button"
                    $type={type}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    확인
                  </S.Button>
                </S.ButtonArea>
              </S.ConfirmBox>
            </S.Container>
            <S.Background
              onClick={() => {
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

export default BadgeAlert;

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
  `,
  ConfirmBox: styled(FlexBoxAlignCenter)`
    width: 400px;
    height: 300px;
    border-radius: 10px;
    background: #fff;

    padding-top: 90px;

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
    margin-bottom: 8px;
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
