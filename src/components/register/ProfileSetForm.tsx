import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shortid from 'shortid';
import supabase from 'src/lib/supabaseClient';
import styled from 'styled-components';

interface Props {
  userEmail: string;
}

const ProfileSetForm = ({ userEmail }: Props) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [profileImgSrc, setProfileImgSrc] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const imgURL = URL.createObjectURL(selectedFile);
      setProfileImgSrc(imgURL);
    }
  };

  const setProfile = async () => {
    const newUser = {
      email: userEmail,
      nickname,
      profileImg: profileImgSrc || ''
    };

    const { data, error } = await supabase.from('users').insert(newUser).select();
    alert('회원가입 완료!')
    navigate('/');
  };

  return (
    <>
      <RegisterFormContainer>
        <ProfileImgnameBox>
          <ProfileImgLabel>프로필 사진</ProfileImgLabel>
          <ProfileImgInput type="file" accept="image/*" onChange={handleImageChange} />
          {profileImgSrc && <PreviewImage src={profileImgSrc} alt="프로필 이미지" />}
        </ProfileImgnameBox>
        <Label>닉네임</Label>
        <NickNameInput
          maxLength={15}
          type="text"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />

        <Button onClick={setProfile}>프로필 설정하기</Button>
      </RegisterFormContainer>
    </>
  );
};

export default ProfileSetForm;

export const ProfileImgLabel = styled.div`
  flex: 0 0 120px;
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
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
`;

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
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
