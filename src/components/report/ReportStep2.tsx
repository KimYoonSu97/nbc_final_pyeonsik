import React from 'react';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { inquiry2Atom, stepAtom } from 'src/globalState/jotai';
import styled from 'styled-components';
import { Title, ReportButton, Option } from './utility/CommonStyles';

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
              onClick={() => setSelectedInquiry2(option)}
            >
              {option}
            </S.Option>
          );
        })}
      </S.OptionBox>
      <S.ReportButton onClick={handleNext2} className={isStep2Complete ? 'complete' : ''}>
        선택 완료
      </S.ReportButton>
    </S.ReportInner>
  );
};

export default ReportStep2;

const S = {
  ReportInner: styled.div`
    .selected {
      border: 1px solid var(--main, #f02826);
    }
    .complete {
      background-color: #f02826;
    }
  `,
  OptionTitle: styled(Title)``,
  OptionBox: styled.div`
    margin-bottom: 40px;
  `,
  Option: styled(Option)``,
  ReportButton: styled(ReportButton)``
};
