import React, { useEffect, useState } from 'react';
import supabase from 'src/lib/supabaseClient';
import { styled } from 'styled-components';

const Profile = () => {
  const [user, setUser] = useState({});

  const fetchUserData = async () => {
    //로그인한 유저 정보 필요함
    const id = 'be029d54-dc65-4332-84dc-10213d299c53';
    const { data, error } = await supabase.from('users').select('*').single();
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    fetchUserData();
    console.log('내정보 컴포넌트 마운트됨');
    return () => {
      console.log('내정보 컴포넌트 언마운트됨');
    };
  }, []);

  return (
    <S.Container>
      <S.SubjectArea>
        <S.Subject>프로필 설정</S.Subject>
      </S.SubjectArea>
      <S.InfoArea>
        <S.ProfileBox>
          <S.ProfileImgArea></S.ProfileImgArea>
        </S.ProfileBox>
        <S.InfoBox>
          <S.InputWrapper>
            <S.InfoCaption>닉네임</S.InfoCaption>
            <S.InfoInputBox>
              <S.InfoInputArea></S.InfoInputArea>
              <S.InfoSubmitButton>변경</S.InfoSubmitButton>
            </S.InfoInputBox>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InfoCaption>이메일</S.InfoCaption>
            <S.InfoInputBox>
              <S.InfoInputArea></S.InfoInputArea>
            </S.InfoInputBox>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InfoCaption>로그인 된 소셜 계정</S.InfoCaption>
            <S.InfoInputBox>
              <S.InfoInputArea></S.InfoInputArea>
            </S.InfoInputBox>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InfoCaption>비밀번호 변경</S.InfoCaption>
            <S.InfoInputBox>
              <S.InfoInputArea></S.InfoInputArea>
              <S.InfoSubmitButton>변경</S.InfoSubmitButton>
            </S.InfoInputBox>
          </S.InputWrapper>
        </S.InfoBox>
      </S.InfoArea>
    </S.Container>
  );
};

export default Profile;

const S = {
  Container: styled.div`
    width: 100%;
    height: 424px;
    background: #fff;
    border-radius: 10px;
  `,
  SubjectArea: styled.div`
    height: 64px;
    /* background-color: royalblue; */
  `,
  Subject: styled.div``,
  InfoArea: styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 22px;
    /* background-color: royalblue; */
  `,
  ProfileBox: styled.div``,
  ProfileImgArea: styled.div`
    width: 80px;
    height: 80px;
    background: #d9d9d9;
    border-radius: 100px;
  `,
  InfoBox: styled.div``,
  InputWrapper: styled.div``,
  InfoCaption: styled.div`
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
  `,
  InfoInputBox: styled.div`
    width: 330px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    padding: 8px 8px 8px 12px;
    background: #efefef;
  `,
  InfoInputArea: styled.input``,
  InfoSubmitButton: styled.div`
    margin-left: auto;
  `
};
