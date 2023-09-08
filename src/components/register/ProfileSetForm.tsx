import Filter from 'badwords-ko'; // 비속어 필터링(한글)
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from 'src/lib/supabaseClient';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { userAtom } from 'src/globalState/jotai';
import { toast } from 'react-toastify';
import { FlexBoxCenter, FlexBoxAlignCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import { IconCameraSmall } from '../icons';

interface Props {
  userEmail: string;
}

const ProfileSetForm = ({ userEmail }: Props) => {
  const inputRef = useRef<any>(null);

  const filter = new Filter();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [profileImgSrc, setProfileImgSrc] = useState<string>('');
  const [baseImg] = useState('./baseprofile.jpeg');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [_, setLoginUser] = useAtom(userAtom);

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

    // 타자칠때마다 서버 통신을 합니당 ㅠ
    // 일단 위에 리턴문이 있어서 그거 다 통과해야 검사 할수 있도록 하는...거로 해놓았습니다.
    const { data: existingUsers, error: existingUsersError } = await supabase
      .from('users')
      .select('*')
      .eq('nickname', nickname)
      .maybeSingle();

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
      toast('올바른 닉네임 형식이 아닙니다.');
      return;
    }
    if (nickname.length < 2) {
      toast('2글자 이상 이어야 합니다.');
      return;
    }
    if (filterdNickName.includes('*')) {
      toast('비속어는 사용할 수 없어요. 🤬');
      return;
    }

    const newUser = {
      email: userEmail,
      nickname,
      profileImg: profileImgSrc
    };
    if (!nickname) {
      toast('닉네임을 입력해주세요');
      return;
    }
    if (profileImgSrc === '') {
      toast('사진을 등록해주세요');
      return;
    }

    const { data, error } = await supabase.from('users').insert(newUser).select().single();

    setLoginUser(data);
    toast('회원가입 완료!');
    navigate('/');
  };

  return (
    <>
      <S.Container>
        <S.Title>프로필 설정</S.Title>
        <S.ProfileBox>
          <S.ProfileChangeButton
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <IconCameraSmall />
          </S.ProfileChangeButton>
          <S.ProfileImg src={profileImgSrc || baseImg} alt="프로필 이미지" />
          <S.ProfileInput
            ref={inputRef}
            src={baseImg}
            type="file"
            accept="image/*"
            onChange={(e) => {
              encodeFileTobase64(e.target.files![0] as Blob);
            }}
          />
        </S.ProfileBox>
        <S.InputArea>
          <S.Input
            maxLength={15}
            type="text"
            value={nickname}
            placeholder="닉네임을 입력해주세요."
            onChange={nickNameHandler}
          />
        </S.InputArea>
        {!isError && <S.SuccessMessage>{successMessage}</S.SuccessMessage>}
        {isError && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
        {isError ? (
          <S.SubmitDisable>편식 시작하기</S.SubmitDisable>
        ) : (
          <S.Submit onClick={setProfile}>편식 시작하기</S.Submit>
        )}
      </S.Container>
    </>
  );
};

export default ProfileSetForm;

const S = {
  Container: styled(FlexBoxCenter)`
    padding: 30px;
    width: 490px;
    height: 360px;
    border-radius: 10px;
    border: 1px solid #efefef;
    background: #fff;
    flex-direction: column;
    margin: 0 auto;
    position: relative;
  `,
  ProfileBox: styled.div`
    width: 80px;
    height: 80px;
    margin-bottom: 26px;
    position: relative;
  `,
  ProfileChangeButton: styled(FlexBoxCenter)`
    cursor: pointer;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 80px;
    position: absolute;
    bottom: 0;
    right: 0;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
  `,
  Title: styled.div`
    color: var(--font-black, var(--Black, #242424));
    margin-bottom: 30px;
    ${styleFont.titleLarge}
  `,
  ProfileImg: styled.img`
    width: 80px;
    height: 80px;
    border-radius: 100px;
    border: 1px solid #fff;
  `,
  ProfileInput: styled.input`
    display: none;
  `,
  InputArea: styled(FlexBoxCenter)`
    width: 294px;
    height: 42px;
    border-radius: 6px;
    border: 1px solid #ced4da;
    background: #fff;
    padding: 12px 11px;
    /* margin-bottom: 8px; */
  `,
  Input: styled.input`
    outline: none;
    width: 100%;
    color: var(--font-black, var(--Black, #242424));
    border: none;
    ${styleFont.bodyMedium}
    &::placeholder {
      color: var(--neutral-400, var(--neutral-400, #98a2b3));
    }
  `,
  ErrorMessage: styled.div`
    margin-top: 10px;
    width: 294px;
    height: 44px;
    color: red;
    ${styleFont.bodyMedium}
  `,
  SuccessMessage: styled.div`
    width: 294px;
    height: 44px;
    padding: 0 10px;
    margin-top: 10px;
    color: blue;
    ${styleFont.bodyMedium}
  `,
  SubmitDisable: styled(FlexBoxCenter)`
    cursor: pointer;
    display: flex;
    width: 294px;
    height: 42px;
    justify-content: center;
    align-items: center;
    background: var(--neutral-300, #d0d5dd);
    border-radius: 6px;
    color: #fff;
    text-align: center;
    ${styleFont.buttonSmall}
  `,
  Submit: styled(FlexBoxCenter)`
    cursor: pointer;
    display: flex;
    width: 294px;
    height: 42px;
    justify-content: center;
    align-items: center;
    background: var(--main, #f02826);
    border-radius: 6px;
    color: #fff;
    text-align: center;
    ${styleFont.buttonSmall}
  `
};
