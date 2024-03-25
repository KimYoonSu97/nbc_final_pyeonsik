import React, { useCallback, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { EMAIL_CHECK } from 'src/utility/guide';
import styled from 'styled-components';
import { isValidEmail } from './utility/Email';
import { useAtom } from 'jotai';
import { emailAtom, inquiry1Atom, stepAtom } from 'src/globalState/jotai';
import { Title, ReportButton, Option } from './utility/CommonStyles';

const options1 = ['유저 신고', '오류 제보', '기타'];

const ReportStep1 = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [, setStep] = useAtom(stepAtom);
  const [selectedInquiry1, setSelectedInquiry1] = useAtom(inquiry1Atom);

  const userId = useLoginUserId();

  const handleEmailBlur = () => {
    if (email.trim() !== '' && !isValidEmail(email)) {
      toast(EMAIL_CHECK);
      return;
    }
  };
  
  const selectedUser = selectedInquiry1 === '유저 신고'

  const handleNextButton = () => {
    if (selectedUser && email.trim() !== '') {
      if ((selectedUser && email.trim() !== '', !isValidEmail(email))) {
        toast(EMAIL_CHECK);
      } else {
        setStep(2);
      }
    } else if (selectedInquiry1 === '오류 제보' || selectedInquiry1 === '기타') {
      setStep(3);
    } else if (userId && selectedUser) {
      setStep(2);
    } else {
      toast('항목을 선택해 주세요.');
    }
  };

  const isStep1Complete = userId ? selectedInquiry1 !== '' : email.trim() !== '' && selectedInquiry1 !== '';

  return (
    <S.ReportInner>
      <S.TitleWrap>
        <h1>편식 고객센터</h1>
        <h2>
          안녕하세요! 편식 고객센터입니다.
          <span>편식을 사용하면서 오류나 궁금한 점이 있다면 자유롭게 문의 남겨주세요.</span>
        </h2>
      </S.TitleWrap>
      {userId ? (
        null && undefined
      ) : (
        <S.EmailWrap>
          <S.OptionTitle>이메일</S.OptionTitle>
          <input
            className="emailInput"
            value={email}
            onBlur={handleEmailBlur}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 적어주세요."
          />
        </S.EmailWrap>
      )}
      <S.OptionWrap>
        <S.OptionTitle>문의 항목</S.OptionTitle>
        <S.OptionBox>
          {options1.map((option) => (
            <S.Option
              aria-label="step1Option"
              key={option}
              className={`option ${selectedInquiry1 === option ? 'selected' : ''}`}
              onClick={() => setSelectedInquiry1(option)}
            >
              {option}
            </S.Option>
          ))}
        </S.OptionBox>
        <S.ReportButton
          aria-label="step1Complete"
          type="button"
          onClick={handleNextButton}
          className={isStep1Complete ? 'complete' : ''}
        >
          선택 완료
        </S.ReportButton>
      </S.OptionWrap>
    </S.ReportInner>
  );
};

export default ReportStep1;

const S = {
  ReportInner: styled.div``,
  TitleWrap: styled.div`
    h1 {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: -2px;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 50px;
      letter-spacing: -1.5px;
      span {
        display: block;
      }
    }
  `,
  EmailWrap: styled.div`
    margin-bottom: 50px;
    h3 {
      display: inline-block;
      position: relative;
      right: 0px;
      top: 0px;
      &::after {
        display: block;
        content: '*필수';
        position: absolute;
        right: -50px;
        top: 5px;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        color: #98a2b3;
      }
    }
    .emailInput {
      display: block;
      width: 310px;
      border: 1px solid #ced4da;
      background-color: #fff;
      border-radius: 5px;
      padding: 11px 0px 11px 12px;
      margin-bottom: 8px;
    }
  `,
  OptionWrap: styled.div`
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
