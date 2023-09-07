import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserData, updateUserNickname, updateProfileImg } from 'src/api/userLogin';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import { styled } from 'styled-components';
import { IconCamera } from '../icons';
import { FlexBox, FlexBoxAlignCenter, FlexBoxCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import useUserMutate from 'src/hooks/useUserMutate';
// 탈퇴
import UserDelete from '../register/UserDelete';
import { toast } from 'react-toastify';

const Profile = () => {
  const queryClient = useQueryClient();
  const userId = useLoginUserId();
  const [nickname, setNickname] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [currentNickname, setCurrentNickname] = useState('');
  const inputRef = useRef<any>(null);

  const { data, isLoading, isError } = useQuery(['loginUser'], () => getUserData(userId), {
    enabled: userId ? true : false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  const { nicknameMutation, profileImgMutation } = useUserMutate();

  useEffect(() => {
    setNickname(data?.data?.nickname);
    setCurrentNickname(data?.data?.nickname);
  }, [data]);

  const encodeFileTobase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(() => {
      reader.onload = () => {
        // setProfileImg(reader.result as string);
        const newProfileImg = {
          profileImg: reader.result,
          id: userId
        };
        profileImgMutation.mutate(newProfileImg);
      };
    });
  };

  const updateNickname = async () => {
    if (nickname === currentNickname) {
      toast('새로운 닉네임을 입력하지 않았습니다.');
      return;
    }
    const { data: allNickname, error: allNicknameError } = await supabase
      .from('users')
      .select('nickname')
      .eq('nickname', nickname);

    if (allNickname?.length !== 0) {
      toast('이미 있는 닉네임 입니다ㅠㅠ');
      return;
    }

    nicknameMutation.mutate({ nickname, id: userId });
  };

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }

  return (
    <>
      <S.Container>
        <S.ProfileBox>
          <S.ProfileChangeButton
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <IconCamera />
          </S.ProfileChangeButton>
          <S.ProfileImgArea $url={data?.data?.profileImg || ''}></S.ProfileImgArea>
          <S.ProfileChange
            ref={inputRef}
            type="file"
            accept="image/*"
            value={profileImg}
            onChange={(e) => {
              encodeFileTobase64(e.target.files![0] as Blob);
            }}
          ></S.ProfileChange>
        </S.ProfileBox>
        <S.InputWrapper>
          <S.InfoCaption>닉네임</S.InfoCaption>
          <S.NicknameInputBox>
            <S.InputArea
              type="text"
              value={nickname || ''}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            ></S.InputArea>
            <S.InfoSubmitButton onClick={updateNickname}>변경</S.InfoSubmitButton>
          </S.NicknameInputBox>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.InfoCaption>이메일</S.InfoCaption>
          <S.InfoInputBox>{data?.data?.email}</S.InfoInputBox>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.InfoCaption as="div">로그인 된 소셜 계정</S.InfoCaption>
          <S.InfoInputBox></S.InfoInputBox>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.InfoCaption>비밀번호 변경</S.InfoCaption>
          <S.NicknameInputBox>
            🤫 아무도 모르게 비밀번호 변경하기
            <S.InfoSubmitButton>변경</S.InfoSubmitButton>
          </S.NicknameInputBox>
        </S.InputWrapper>
        <UserDelete />
      </S.Container>
    </>
  );
};

export default Profile;

interface ProfileImgProps {
  $url: string;
}

const S = {
  Container: styled(FlexBoxCenter)`
    width: 100%;
    height: 75vh;
    flex-direction: column;
    background: #fff;
    border-radius: 10px;
    gap: 24px;
  `,
  ProfileChange: styled.input`
    visibility: hidden;
  `,
  ProfileChangeButton: styled(FlexBoxCenter)`
    width: 42px;
    height: 42px;
    background: #fff;
    border-radius: 80px;
    position: absolute;
    bottom: 0;
    right: 0;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
  `,
  ProfileBox: styled.div`
    width: 130px;
    height: 130px;
    margin-bottom: 30px;
    position: relative;
  `,
  ProfileImgArea: styled(FlexBoxCenter)<ProfileImgProps>`
    width: 130px;
    height: 130px;
    border-radius: 100px;
    overflow: hidden;
    background-image: url(${(props) => props.$url});
    background-position: center;
    background-size: contain;
  `,
  InputWrapper: styled.div``,
  InfoCaption: styled.div`
    ${styleFont.labelSmall}
  `,
  InfoInputBox: styled(FlexBoxAlignCenter)`
    width: 330px;
    margin-top: 4px;
    padding: 8px 8px 8px 12px;
    height: 36px;
    background: #efefef;
    border-radius: 10px;
    background: var(--neutral-100, #f2f4f7);

    color: var(--font-black, var(--black, #242424));

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `,
  InputArea: styled.input`
    outline: none;
    width: 250px;

    border: none;
  `,
  InfoSubmitButton: styled(FlexBox)`
    margin-left: auto;
    border-radius: 10px;
    height: 20px;
    padding: 2px 8px;
    background: var(--neutral-100, #f2f4f7);
    color: var(--font-black, var(--black, #242424));
    text-align: center;

    /* label-small */
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 145.455% */
  `,
  NicknameInputBox: styled(FlexBoxAlignCenter)`
    width: 330px;
    margin-top: 4px;
    padding: 8px 8px 8px 12px;
    border-radius: 10px;
    border: 1px solid var(--neutral-100, #f2f4f7);

    color: var(--font-black, var(--black, #242424));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `
};
