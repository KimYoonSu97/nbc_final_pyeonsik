import { useAtom } from 'jotai';
import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { updateBugBadge, updateSheriffBadge } from 'src/api/badge';
import supabase from 'src/lib/supabaseClient';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { emailAtom, inquiry1Atom, inquiry2Atom, stepAtom } from 'src/globalState/jotai';

const ReportStep3 = () => {
  const [email] = useAtom(emailAtom);
  const [inquiry1] = useAtom(inquiry1Atom);
  const [inquiry2] = useAtom(inquiry2Atom);
  const [imageName, setImageName] = useState<string>('');
  const [image, setImage] = useState<File>();
  const [urlLink, setUrlLink] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [, setStep] = useAtom(stepAtom);

  const userId = useLoginUserId();

  const isStep3Complete = imageName !== '' && (urlLink.trim() !== '' || message.trim() !== '');

  const reportImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadimage = event?.target.files[0];
      const originalFileName = uploadimage.name;
      const fileExtension = originalFileName.split('.').pop();
      const randomFileName = uuidv4() + '.' + fileExtension;
      setImageName(randomFileName);
      setImage(uploadimage);
    }
  };

  const handleSubmitButton = async () => {
    const url = [];
    if (image) {
      const { data, error } = await supabase.storage.from('photos').upload(`report/${imageName}`, image);
      if (error) {
        console.error('Error uploading image to Supabase storage:', error);
        toast('이미지 업로드 중 에러가 발생했습니다.');
        return;
      }
      url.push(data.path);
    }

    const reportData = {
      email,
      userId,
      inquiry1,
      inquiry2,
      detailReport: {
        image: `${process.env.REACT_APP_SUPABASE_STORAGE_REPORT}${url}`,
        urlLink,
        message
      }
    };
    if (
      reportData.detailReport.image !== '' &&
      reportData.detailReport.urlLink !== '' &&
      reportData.detailReport.message !== ''
    ) {
      await supabase.from('reports').insert([reportData]);
      setStep(4);
    } else {
      toast('항목을 입력해주세요.');
      return;
    }

    if (inquiry1 === '유저 신고') {
      updateSheriffBadge(userId);
    } else updateBugBadge(userId);
  };

  return (
    <S.ReportInner>
      <S.Title>
        해당 내용을 확인 할 수 있는<span>사진이나 파일, 링크를 첨부해 주세요.</span>
      </S.Title>
      <S.FileUploadWrap>
        <label htmlFor="fileupload">{imageName ? imageName : '클릭하여 파일을 선택해 주세요.'}</label>
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={reportImage}
          id="fileupload"
          placeholder="클릭하여 파일을 선택해 주세요."
        />
      </S.FileUploadWrap>
      <input value={urlLink} onChange={(e) => setUrlLink(e.target.value)} placeholder="링크를 입력해 주세요." />
      <input
        className="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="사진이나 파일, 링크에 대해 편식 운영자가 이해할 수 있는 추가 설명을 해주세요."
      />
      <button onClick={handleSubmitButton} className={isStep3Complete ? 'complete' : ''}>
        제출하기
      </button>
    </S.ReportInner>
  );
};

export default ReportStep3;

const S = {
  ReportInner: styled.div`
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
  Title: styled.h3`
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    letter-spacing: -1.5px;
    margin-bottom: 34px;
    span{
      display: block;
    }
  `,
  FileUploadWrap: styled.div`
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
  `
};
