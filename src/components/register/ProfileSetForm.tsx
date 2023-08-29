import Filter from 'badwords-ko'; // 비속어 필터링(한글)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from 'src/lib/supabaseClient';
import styled from 'styled-components';
import baseImage from '../../images/baseprofile.jpeg';

interface Props {
  userEmail: string;
}

const ProfileSetForm = ({ userEmail }: Props) => {
  const filter = new Filter();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [profileImgSrc, setProfileImgSrc] = useState<string>('');
  const [baseImg] = useState(baseImage);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const correctNickNameMessages = [
    '아무도 생각하지 못한 멋진 닉네임이에요! 😎',
    '이런 창의적인 생각은 어떻게 하나요? 👏',
    '이 세상에 하나뿐인 닉네임일지도 몰라요! 🥳',
    '누구나 부러워할 최고의 닉네임이에요! 🤘'
  ];

  const [isError, setIsError] = useState(false);

  // Blob 형태를 string으로 변환
  const encodeFileTobase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(() => {
      reader.onload = () => {
        setProfileImgSrc(reader.result as string);
      };
    });
  };

  const observeNickName = async () => {
    const { data: existingUsers, error: existingUsersError } = await supabase
      .from('users')
      .select('*')
      .eq('nickname', nickname)
      .maybeSingle();

    const filterdNickName = filter.clean(nickname);
    // 유효성 검사

    // 한글, 영어,숫자, _ , - 만 가능하게끔 설정
    const nicknamePattern = /^[a-zA-Z0-9가-힣_\-]+$/;
    if (!nicknamePattern.test(nickname) && nickname) {
      setIsError(true);
      setErrorMessage('올바른 닉네임 형식이 아닙니다.');
      return;
    }
    if (nickname.length === 1) {
      setIsError(true);
      setErrorMessage('2글자 이상 이어야 합니다.');
      return;
    }
    if (filterdNickName.includes('*')) {
      setIsError(true);
      setErrorMessage('비속어는 사용할 수 없어요. 🤬');
      return;
    }

    if (nickname) {
      if (existingUsers) {
        setIsError(true);
        setErrorMessage('이런! 누군가 먼저 선점한 닉네임이에요! 😥');
      } else {
        setIsError(false);
        const randomIndex = Math.floor(Math.random() * correctNickNameMessages.length);
        const randomMessage = correctNickNameMessages[randomIndex];
        setSuccessMessage(randomMessage);
      }
    }
  };

  const nickNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  useEffect(() => {
    observeNickName();
  }, [nickname]);

  const setProfile = async () => {
    const filterdNickName = filter.clean(nickname);
    // 유효성 검사

    // 한글, 영어,숫자, _ , - 만 가능하게끔 설정
    const nicknamePattern = /^[a-zA-Z0-9가-힣_\-]+$/;
    if (!nicknamePattern.test(nickname)) {
      alert('올바른 닉네임 형식이 아닙니다.');
      return;
    }
    if (nickname.length < 2) {
      alert('2글자 이상 이어야 합니다.');
      return;
    }
    if (filterdNickName.includes('*')) {
      alert('비속어는 사용할 수 없어요. 🤬');
      return;
    }

    const newUser = {
      email: userEmail,
      nickname,
      profileImg: profileImgSrc
    };
    if (!nickname) {
      alert('닉네임을 입력해주세요');
      return;
    }
    if (profileImgSrc === '') {
      alert('사진을 등록해주세요');
      return;
    }

    const { data, error } = await supabase.from('users').insert(newUser).select();
    alert('회원가입 완료!');
    navigate('/');
  };

  return (
    <>
      <RegisterFormContainer>
        <ProfileImgnameBox>
          <ProfileImgLabel>프로필 설정</ProfileImgLabel>
          <div>
            <PreviewImage src={profileImgSrc || baseImg} alt="프로필 이미지" />
            <ProfileImgInput
              src={baseImg}
              type="file"
              accept="image/*"
              onChange={(e) => {
                encodeFileTobase64(e.target.files![0] as Blob);
              }}
            />
          </div>
        </ProfileImgnameBox>

        {!isError && <SuccessMessage>{successMessage}</SuccessMessage>}

        {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Label>닉네임</Label>
        <NickNameInput maxLength={15} type="text" value={nickname} placeholder="닉네임" onChange={nickNameHandler} />
        <InformMessage>편식에서만의 닉네임을 사용해보세요!</InformMessage>
        <Button onClick={setProfile}>편식 시작하기</Button>
      </RegisterFormContainer>
    </>
  );
};

export default ProfileSetForm;

export const ProfileImgLabel = styled.div`
  flex: 0px;
  font-weight: bold;
`;

export const ProfileImgInput = styled.input`
  border: 1px solid black;
  width: 300px;
  border-radius: 6px;
  margin-right: 118px;
`;

const ProfileImgnameBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;

  justify-content: center;

  flex-direction: column;
`;

const InformMessage = styled.div`
  font-size: 10px;
  color: blue;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: black solid 2px;
  display: block;
  margin: 20px auto;
`;

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;

  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
`;

const NickNameInput = styled.input`
  padding: 10px;
  width: 150px;
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

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  margin-top: 10px;
  color: blue;
  font-size: 14px;
`;
