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

const BoardAlert = () => {
  return new Promise<boolean>((resolve, reject) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <>
            <S.Container>
              <S.ConfirmBox>
                <S.Title>'그르르갉'이란?</S.Title>
                <S.Description>
                  {
                    '편의점 플라스틱 의자를 끌 때 나는 소리예요.\n그르르갉에서 편하게 가벼운 소재부터\n무거운 고민까지, 다양한 얘기를 나눠보세요!'
                  }
                </S.Description>
                <S.ButtonArea>
                  <S.Button
                    as="button"
                    onClick={() => {
                      localStorage.setItem('boardInfoNever', 'true');

                      onClose();
                    }}
                  >
                    시작하기
                  </S.Button>
                </S.ButtonArea>
                <S.NeverArea
                  onClick={() => {
                    localStorage.setItem('boardInfoNever', 'true');
                    onClose();
                  }}
                >
                  다시 보지 않기
                </S.NeverArea>
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

export default BoardAlert;

const ButtonBasic = styled(FlexBoxCenter)`
  width: 122px;
  height: 36px;
  border-radius: 6px;
  text-align: center;
`;
interface ButtonProps {
  $type?: string;
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
    background: rgba(36, 36, 36, 0.2);
    z-index: 101;
  `,
  ConfirmBox: styled(FlexBoxAlignCenter)`
    width: 400px;
    height: 278px;
    border-radius: 10px;
    background: #fff;

    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
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
    margin-top: 30px;
    margin-bottom: 24px;
  `,
  Caption: styled.p`
    color: var(--neutral-400, #98a2b3);
    text-align: center;
    white-space: pre-line;
    ${styleFont.bodyLarge};
    font-weight: 700;
  `,

  Description: styled.p`
    text-align: center;
    white-space: pre-line;
    margin-bottom: 24px;

    ${styleFont.labelLarge};
    color: var(--neutral-400, #98a2b3);
  `,
  ButtonArea: styled(FlexBox)`
    cursor: pointer;
    margin-bottom: 16px;
  `,
  Button: styled(ButtonBasic)<ButtonProps>`
    background: var(--Black, #242424);
    color: #fff;
    ${styleFont.buttonSmall}
    cursor: pointer;
  `,
  NeverArea: styled.div`
    color: var(--neutral-400, #98a2b3);
    text-align: center;

    cursor: pointer;

    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
  `
};
