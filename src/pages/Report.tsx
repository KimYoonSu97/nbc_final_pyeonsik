import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { updateBugBadge, updateSheriffBadge } from 'src/api/badge';
import { toast } from 'react-toastify';

const options1 = ['유저 신고', '오류 제보', '기타'];
const options2 = [
  '불법성 게시물 또는 댓글',
  '음란성 게시물 또는 댓글',
  '개인정보노출 게시물 또는 댓글',
  '저작권 침해 게시물 또는 댓글',
  '홍보성 게시물 또는 댓글',
  '비방/비하/욕설 게시물 또는 댓글',
  '불법 상품 판매 게시물 또는 댓글'
];

const Report = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [selectedInquiry1, setSelectedInquiry1] = useState<string>('');
  const [selectedInquiry2, setSelectedInquiry2] = useState<string>('');
  const [image, setImage] = useState<File>();
  const [imageName, setImageName] = useState<string>('');
  const [urlLink, setUrlLink] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const userId = useLoginUserId();
  const navigate = useNavigate();

  const isStep1Complete = userId || (email.trim() !== '' && selectedInquiry1 !== '');
  const isStep2Complete = selectedInquiry2 !== '';
  const isStep3Complete = imageName !== '' && (urlLink.trim() !== '' || message.trim() !== '');

  const reportImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      //null 방지?
      const uploadimage = event?.target.files[0];
      const originalFileName = uploadimage.name;
      const fileExtension = originalFileName.split('.').pop();
      const randomFileName = uuidv4() + '.' + fileExtension;
      setImageName(randomFileName);
      setImage(uploadimage);
    }
  };

  const nextStep = () => setStep(step + 1);

  const handleOptionClick = (option: string) => {
    setSelectedInquiry1(option);
  };
  const handleOption2Click = (option: string) => {
    setSelectedInquiry2(option);
  };

  const handleNext = () => {
    if (selectedInquiry1 === '유저 신고' && email.trim() !== '') {
      if ((selectedInquiry1 === '유저 신고' && email.trim() !== '', !isValidEmail(email))) {
        toast('올바른 이메일 형식이 아닙니다.');
      } else {
        setStep(2);
      }
    } else if (selectedInquiry1 === '오류 제보' || selectedInquiry1 === '기타') {
      setStep(3);
    } else if (userId && selectedInquiry1 === '유저 신고') {
      setStep(2);
    } else {
      toast('항목을 선택해 주세요.');
    }
  };
  const handleNext2 = () => {
    if (selectedInquiry2) {
      nextStep();
    } else {
      toast('항목을 선택해 주세요.');
    }
  };

  const handleSubmitButton = async () => {
    const url = [];
    if (image) {
      const { data, error } = await supabase.storage.from('photos').upload(`report/${imageName}`, image);
      if (error) {
        console.error('Error uploading image to Supabase storage:', error);
        toast('이미지 업로드 중 에러가 발생했습니다!');
        return;
      }
      url.push(data.path);
    }

    const reportData = {
      email,
      userId,
      inquiry1: selectedInquiry1,
      inquiry2: selectedInquiry2,
      detailReport: {
        image: `${process.env.REACT_APP_SUPABASE_STORAGE_REPORT}${url}`,
        urlLink,
        message
      }
    };

    await supabase.from('reports').insert([reportData]);
    nextStep();
    if (selectedInquiry1 === '유저 신고') {
      updateSheriffBadge(userId);
    } else updateBugBadge(userId);
  };

  const handleEmailBlur = () => {
    if (email.trim() !== '' && !isValidEmail(email)) {
      toast('올바른 이메일 형식이 아닙니다.');
      return;
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <ReportWrap id="container">
      {step === 1 && (
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
              <h3>편식 가입 이메일</h3>
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
            <div className="options-box">
              {options1.map((option) => (
                <p
                  key={option}
                  className={`option ${selectedInquiry1 === option ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </p>
              ))}
            </div>
            <button onClick={handleNext} className={isStep1Complete ? 'complete' : ''}>
              선택 완료
            </button>
          </div>
        </ReportInner>
      )}
      {step === 2 && (
        <ReportInner>
          <h3>이런! 불쾌함을 조성하는 유저가 있나요?</h3>
          <div className="options-box">
            {options2.map((option) => {
              return (
                <p
                  key={option}
                  className={`option ${selectedInquiry2 === option ? 'selected' : ''}`}
                  onClick={() => handleOption2Click(option)}
                >
                  {option}
                </p>
              );
            })}
          </div>
          <button onClick={handleNext2} className={isStep2Complete ? 'complete' : ''}>
            선택 완료
          </button>
        </ReportInner>
      )}
      {step === 3 && (
        <ReportInner>
          <h3 className="last_h3">
            해당 내용에 대해 확인 할 수 있는<span>사진, 파일, 링크를 업로드 해주세요.</span>
          </h3>
          <div>
            <label htmlFor="fileupload">{imageName ? imageName : '클릭하여 파일을 선택해주세요.'}</label>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={reportImage}
              id="fileupload"
              placeholder="클릭하여 파일을 선택해주세요."
            />
          </div>
          <input value={urlLink} onChange={(e) => setUrlLink(e.target.value)} placeholder="주소 링크를 입력해주세요." />
          <input
            className="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="사진,파일,링크에 대해 식신 운영자가 이해할 수 있는 추가 설명을 해주세요."
          />
          <button onClick={handleSubmitButton} className={isStep3Complete ? 'complete' : ''}>
            제출하기
          </button>
        </ReportInner>
      )}
      {step === 4 && (
        <ReportInner>
          <h3 className="reportEnd">
            제보에 도움을 주셔서 감사합니다.
            <br />
            빠른 시일 내에 문제를 해결하겠습니다.
          </h3>
          <button
            className="goHome"
            onClick={() => {
              navigate('/');
            }}
          >
            메인 화면으로 돌아가기
          </button>
        </ReportInner>
      )}
    </ReportWrap>
  );
};

export default Report;

const ReportWrap = styled.div``;

const ReportInner = styled.div`
  margin-top: 70px;
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

  h3 {
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    margin-bottom: 16px;
    letter-spacing: -1.5px;
    span {
      display: block;
    }
  }
  .emailWrap {
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
  }

  .last_h3 {
    margin-bottom: 34px;
  }

  .emailInput {
    width: 310px;
    border: 1px solid #ced4da;
    background-color: #fff;
    border-radius: 5px;
    padding: 11px 0px 11px 12px;
    margin-bottom: 8px;
  }

  .options-box {
    margin-bottom: 40px;
  }

  p {
    width: 310px;
    border: 1px solid #ced4da;
    background-color: #fff;
    border-radius: 5px;
    padding: 11px 0px 11px 12px;
    margin-bottom: 8px;
    &:hover {
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    }
  }

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

  label {
    display: block;
    width: 100%;
    font-size: 13px;
    color: #666;
    background-color: #fff;
    padding: 13px 12px;
    border-radius: 7px;
    margin-bottom: 15px;
    cursor: pointer;
  }

  div > input {
  }

  input {
    display: block;
    width: 100%;
    padding: 10px 12px;
    border-radius: 7px;
    outline: none;
    border: none;
    margin-bottom: 15px;
  }

  .message {
    padding-bottom: 140px;
  }
  .reportEnd {
    margin-bottom: 40px;
  }
  .goHome {
    background-color: #f02826;
    letter-spacing: -1px;
  }
  .complete {
    background-color: #f02826;
  }
`;
