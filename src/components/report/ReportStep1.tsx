import React, { useState } from 'react';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { isValidEmail } from './EmailValid';
import { toast } from 'react-toastify';
import { EMAIL_CHECK } from 'src/utility/guide';

const ReportStep1 = () => {
  const [email, setEmail] = useState<string>('');

  const userId = useLoginUserId();

  const handleEmailBlur = () => {
    if (email.trim() !== '' && !isValidEmail(email)) {
      toast(EMAIL_CHECK);
      return;
    }
  };

  return (
    <ReportInner>
      <div>
        <h1>편식 고객센터</h1>
        <h2>
          안녕하세요! 편식 고객센터입니다.
          <span>편식을 사용하면서 오류나 궁금한 점이 있다면 자유롭게 문의 남겨주세요.</span>
        </h2>
      </div>
      {userId ? null : (
        <div className="emailWrap">
          <h3>이메일</h3>
          <input
            className="emailInput"
            value={email}
            onBlur={handleEmailBlur}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 적어주세요."
          />
        </div>
      )}
      <div>
        <h3>문의 항목</h3>
        <div className="options-box">{renderOptions(options1, selectedInquiry1, handleOptionClick)}</div>
        <button onClick={handleNext} className={isStep1Complete ? 'complete' : ''}>
          선택 완료
        </button>
      </div>
    </ReportInner>
  );
};

export default ReportStep1;
