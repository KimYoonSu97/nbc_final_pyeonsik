import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserData, updateUserNickname, updateProfileImg } from 'src/api/userLogin';
import useLoginUserId from 'src/hooks/useLoginUserId';

import supabase from 'src/lib/supabaseClient';
import { styled } from 'styled-components';

const Profile = () => {
  const queryClient = useQueryClient();
  const userId = useLoginUserId();
  const [nickname, setNickname] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [currentNickname, setCurrentNickname] = useState('');


  const { data, isLoading, isError } = useQuery(['loginUser'], () => getUserData(userId), {
    enabled: userId ? true : false
  });
// =======
//   //그럼 이 함수랑 useEffect도 없어도 됨...
//   const fetchUserData = async () => {
//     //로그인한 유저 정보 필요함
//     const id = 'be029d54-dc65-4332-84dc-10213d299c53';
//     const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
//     console.log(data);
//     setNickname(data.nickname);
//     setUser(data);
//     setIsRender(!isRender);
//   };
// >>>>>>> Stashed changes

  useEffect(() => {
    setNickname(data?.data?.nickname);
    setCurrentNickname(data?.data?.nickname);
  }, [data]);

  //프로필 수정 시 바로 렌더링
  const nicknameMutation = useMutation(updateUserNickname, {
    onSuccess: () => {
      queryClient.invalidateQueries(['loginUser']);
    }
  });

  const profileImgMutation = useMutation(updateProfileImg, {
    onSuccess: () => {
      queryClient.invalidateQueries(['loginUser']);
    }
  });

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
      alert('새로운 닉네임을 입력하지 않았습니다.');
      return;
    }
    const { data: allNickname, error: allNicknameError } = await supabase
      .from('users')
      .select('nickname')
      .eq('nickname', nickname);

    if (allNickname?.length !== 0) {
      alert('이미 있는 닉네임 입니다ㅠㅠ');
      return;
    }

    nicknameMutation.mutate({ nickname, id: userId });
    console.log('쿼리실ㄹ행??');
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
        <S.SubjectArea>
          <S.Subject>프로필 설정</S.Subject>
        </S.SubjectArea>
        <S.InfoArea>
          <S.ProfileChange
            type="file"
            accept="image/*"
            value={profileImg}
            onChange={(e) => {
              encodeFileTobase64(e.target.files![0] as Blob);
            }}
          ></S.ProfileChange>
          <S.ProfileBox>
            <S.ProfileImgArea $url={data?.data?.profileImg || ''}></S.ProfileImgArea>
          </S.ProfileBox>
          <S.InfoBox>
            <S.InputWrapper>
              <S.InfoCaption>닉네임</S.InfoCaption>
              <S.InfoInputBox>
                <S.InfoInputArea
                  type="text"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                ></S.InfoInputArea>
                <S.InfoSubmitButton onClick={updateNickname}>변경</S.InfoSubmitButton>
              </S.InfoInputBox>
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
              <S.InfoInputBox>
                <S.InfoInputArea></S.InfoInputArea>
                <S.InfoSubmitButton>변경</S.InfoSubmitButton>
              </S.InfoInputBox>
            </S.InputWrapper>
          </S.InfoBox>
        </S.InfoArea>
      </S.Container>
    </>
  );
};

export default Profile;

interface ProfileImgProps {
  $url: string;
}

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
  ProfileChange: styled.input`
    width: 20px;
    height: 20px;
    background-color: royalblue;
  `,
  ProfileBox: styled.div``,
  ProfileImgArea: styled.div<ProfileImgProps>`
    border: solid 1px black;
    width: 80px;
    height: 80px;
    border-radius: 100px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${(props) => props.$url});
    background-position: center;
    background-size: contain;
  `,

  ProfileImg: styled.img``,
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
