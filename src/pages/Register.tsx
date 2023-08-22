import { atom, useAtom } from 'jotai';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from 'src/lib/supabaseClient';
import { UserType } from 'src/types/types';
import styled from 'styled-components';

import { v4 as uuidv4 } from 'uuid';

export const userDataAtom = atom<UserType>({
  uid: '',
  email: '',
  password: '',
  nickname: '',
  profileimg: null
});

const Register = () => {
  // 초기 UserData
  const initialUserData = {
    uid: '',
    email: '',
    password: '',
    nickname: '',
    profileimg: null
  };
  const [userData, setUserData] = useAtom(userDataAtom);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [nickname, setNickName] = useState('');
  const navigate = useNavigate();

  const [selectedProfileImg, setSelectedProfileImg] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null); // 추가된 부분

  // 이미지 파일 업로드
  const uploadProfileImage = async (selectedProfileImg: File) => {
    try {
      const { data, error } = await supabase.storage
        .from('photos')
        .upload(`profileimgs/${selectedProfileImg.name}`, selectedProfileImg);
      if (error) {
        throw new Error(error.message);
      }
      console.log('profileImgFile', selectedProfileImg);

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSignUp = async () => {
    // 유효성 검사
    if (!email || !password || !checkPassword) {
      setErrorMessage('값이 비어있습니다!!');
      return;
    }
    if (password !== checkPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다!!');
      return;
    }

    // 입력받은 정보를 userData에 넣기 이 아래부터는 검증되었으므로 통과.
    setUserData({
      // uid: string;
      uid: '',
      email,
      password,
      nickname,
      profileimg: selectedProfileImg
    });
    // 이제 userData에 값이 들어가있는 상태

    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password
      });

      let profileImgUrl = '';

      if (userData.profileimg) {
        const profileImgFile = new File([userData.profileimg], userData.profileimg?.name);
        const uploadData = await uploadProfileImage(profileImgFile);
        profileImgUrl = uploadData.path;
      }

      const userInsertData = {
        ...userData,
        uid: data.user?.id,
        profileimg: profileImgUrl
      };
      const { error: insertError } = await supabase.from('users').insert(userInsertData);
      if (insertError) {
        throw new Error(insertError.message);
      }

      if (data.user) {
        alert('회원가입 완료!');
        navigate('/login');
      }

      if (error) {
        setErrorMessage('Error signing up: ' + error.message);
      } else {
        console.log('Registration successful:', data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
    const nickNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNickName(e.target.value);
    };

    const checkPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setCheckPassword(e.target.value);
    };

    // 이미지 변환 핸들러
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files && e.target.files[0];
      if (selectedFile) {
        const originalFileName = selectedFile.name;
        const fileExtension = originalFileName.split('.').pop();
        const randomFileName = uuidv4() + '.' + fileExtension;
        setSelectedProfileImg(new File([selectedFile], randomFileName));
        setPreviewImageUrl(URL.createObjectURL(selectedFile)); // 추가된 부분
      } else {
        setErrorMessage('이미지를 선택해주세요!');
        setPreviewImageUrl(null); // 이미지 선택이 취소되었을 때 미리보기 이미지 초기화
      }
    };

    return (
      <>
        <RegisterFormContainer>
          <SuccessMessage>{successMessage}</SuccessMessage>
          <ErrorMessage>{errorMessage}</ErrorMessage>

          <Label>이메일</Label>
          <Input type="text" placeholder="이메일을 입력하세요" value={email} onChange={emailHandler} />
          <Label>패스워드</Label>
          <Input
            maxLength={20}
            type="password"
            placeholder="패스워드을 입력하세요"
            value={password}
            onChange={passwordHandler}
          />
          <Label>패스워드 확인</Label>
          <Input
            maxLength={20}
            type="password"
            placeholder="패스워드을 다시 입력하세요"
            value={checkPassword}
            onChange={checkPasswordHandler}
          />
          <Label>닉네임</Label>
          <Input
            maxLength={10}
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={nickNameHandler}
          />

          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {previewImageUrl && <PreviewImage src={previewImageUrl} alt="이미지 미리보기" />}
          <Button onClick={handleSignUp}>회원가입</Button>
          <br />
        </RegisterFormContainer>
      </>
    );

};
export default Register;

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SuccessMessage = styled.div`
  margin-top: 10px;
  color: blue;
  font-size: 14px;
`;
const ErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;

const SelectedFileName = styled.div`
  margin-top: 10px;
  color: #666;
  font-size: 14px;
`;
