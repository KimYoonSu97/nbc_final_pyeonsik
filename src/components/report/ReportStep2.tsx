import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { inquiry2Atom, stepAtom } from 'src/globalState/jotai';
import styled from 'styled-components';

const options2 = [
  '불법성 게시물 또는 댓글',
  '음란성 게시물 또는 댓글',
  '개인정보노출 게시물 또는 댓글',
  '저작권 침해 게시물 또는 댓글',
  '홍보성 게시물 또는 댓글',
  '비방/비하/욕설 게시물 또는 댓글',
  '불법 상품 판매 게시물 또는 댓글'
];

const ReportStep2 = () => {
  const [selectedInquiry2, setSelectedInquiry2] = useAtom(inquiry2Atom);
  const [, setStep] = useAtom(stepAtom);

  const isStep2Complete = selectedInquiry2 !== '';

  const handleOption2Click = (option: string) => {
    setSelectedInquiry2(option);
  };

  const handleNext2 = () => {
    if (selectedInquiry2) {
      setStep(3);
    } else {
      toast('항목을 선택해 주세요.');
    }
  };

  return (
    <S.ReportInner>
      <S.OptionTitle>이런! 불쾌함을 조성하는 유저가 있나요?</S.OptionTitle>
      <S.OptionBox>
        {options2.map((option) => {
          return (
            <S.Option
              key={option}
              className={`option ${selectedInquiry2 === option ? 'selected' : ''}`}
              onClick={() => handleOption2Click(option)}
            >
              {option}
            </S.Option>
          );
        })}
      </S.OptionBox>
      <button onClick={handleNext2} className={isStep2Complete ? 'complete' : ''}>
        선택 완료
      </button>
    </S.ReportInner>
  );
};

export default ReportStep2;

const S = {
  ReportInner: styled.div`
    .selected {
      border: 1px solid var(--main, #f02826);
    }
    button {
      width: 210px;
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
      border-radius: 5px;
      background-color: #ced4da;
      color: #fff;
    }
    .complete {
      background-color: #f02826;
    }
  `,
  OptionTitle: styled.h3`
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    margin-bottom: 16px;
    letter-spacing: -1.5px;
  `,
  OptionBox: styled.div`
    margin-bottom: 40px;
  `,
  Option: styled.p`
    width: 310px;
    border: 1px solid #ced4da;
    background-color: #fff;
    border-radius: 5px;
    padding: 11px 0px 11px 12px;
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    }
  `
};
