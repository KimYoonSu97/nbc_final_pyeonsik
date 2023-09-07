import React from 'react';
import styled from 'styled-components';
import { confirmAlert, ReactConfirmAlertProps } from 'react-confirm-alert';
import { FlexBox, FlexBoxCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';

interface ConfirmModalTextResult {
  title: string;
  caption: string;
  true: string;
  false: string;
}

const postDelete = {
  title: '정말로 삭제할까요?',
  caption: '삭제하면 게시글 및 댓글이 \n 모두 삭제되어 복구할 수 없어요. \n 그래도 삭제할까요?',
  true: '삭제하기',
  false: '취소하기'
};
const writePage = {
  title: '정말로 페이지를 이동할까요?',
  caption: '페이지를 이동하면 \n 작성 중인 내용이 모두 날라가요. \n 그래도 이동할까요?',
  true: '취소하기',
  false: '이동하기'
};
const userDelete = {
  title: '정말로 탈퇴할까요?',
  caption: '탈퇴하면 그동안 편식에 작성한\n게시글 및 댓글이 모두 삭제되어 복구할 수 없어요.\n그래도 탈퇴할까요?',
  true: '탈퇴하기',
  false: '취소하기'
};

const confirmModalText = (type: string): ConfirmModalTextResult => {
  let result: ConfirmModalTextResult;
  if (type === 'postDelete') {
    result = postDelete;
  } else if (type === 'writerPage') {
    result = writePage;
  } else if (type === 'userDelete') {
    result = userDelete;
  }
  return result!;
};

const Confirm = (type: string) => {
  const text = confirmModalText(type);

  return new Promise<boolean>((resolve, reject) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <>
            <S.Container>
              <S.ConfirmBox>
                <S.Title>{text.title}</S.Title>
                <S.Caption>{text.caption}</S.Caption>
                <S.ButtonArea>
                  <S.FalseButton
                    $type={type}
                    onClick={() => {
                      resolve(false);
                      onClose();
                    }}
                  >
                    {text.false}
                  </S.FalseButton>
                  <S.TrueButton
                    $type={type}
                    onClick={() => {
                      resolve(true);
                      onClose();
                    }}
                  >
                    {text.true}
                  </S.TrueButton>
                </S.ButtonArea>
              </S.ConfirmBox>
            </S.Container>
            <S.Background
              onClick={() => {
                resolve(false);
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

export default Confirm;

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
  ConfirmBox: styled(FlexBoxCenter)`
    width: 400px;
    height: 274px;
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
    line-height: 28px; /* 127.273% */
  `,
  Caption: styled.p`
    color: var(--font-black, var(--Black, #242424));
    text-align: center;
    margin: 30px 0 42px;
    white-space: pre-line;
    ${styleFont.bodyLarge};
  `,
  ButtonArea: styled(FlexBox)``,
  TrueButton: styled(ButtonBasic)<ButtonProps>`
    background: var(--main, #f02826);
    color: #fff;
    ${styleFont.buttonSmall}
  `,
  FalseButton: styled(ButtonBasic)<ButtonProps>`
    color: var(--font-black, var(--Black, #242424));

    ${styleFont.buttonSmall}
  `
};
