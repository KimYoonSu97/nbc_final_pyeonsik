import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from 'src/lib/supabaseClient';
import styled from 'styled-components';
import baseImage from '../../images/baseprofile.jpeg';

interface Props {
  userEmail: string;
}

const ProfileSetForm = ({ userEmail }: Props) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [profileImgSrc, setProfileImgSrc] = useState<string>('');
  const [baseImg] = useState(baseImage);

  const encodeFileTobase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(() => {
      reader.onload = () => {
        setProfileImgSrc(reader.result as string);
      };
    });
  };

  const setProfile = async () => {
    // Check if nickname already exists
    const { data: existingUsers, error: existingUsersError } = await supabase
      .from('users')
      .select('*')
      .eq('nickname', nickname)
      .maybeSingle();
    console.log(existingUsers);
    
    // TODO: 중복이어도 return이 안됨..
    if (existingUsers) {
      alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.');
      return;
    }

    const newUser = {
      email: userEmail,
      nickname,
      profileImg: profileImgSrc.length < 5 ? '' : profileImgSrc
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
        <Label>닉네임</Label>
        <NickNameInput
          maxLength={15}
          type="text"
          value={nickname}
          placeholder="닉네임"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <InformMessage>편식에서만의 닉네임을 사용해보세요!</InformMessage>

        <Button onClick={setProfile}>편식 시작하기</Button>
      </RegisterFormContainer>
    </>
  );
};

export default ProfileSetForm;

export const ProfileImgLabel = styled.div`
  flex: 0 0 120px;
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
  margin: 0 auto;
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
