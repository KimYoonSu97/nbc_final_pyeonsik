import Filter from 'badwords-ko';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from 'src/lib/supabaseClient';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { userAtom, userSettingEmail } from 'src/globalState/jotai';
import { toast } from 'react-toastify';
import { FlexBoxCenter, FlexBoxAlignCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import { IconCameraSmall } from '../icons';
import {
  CORRECT_NICK_MESSAGES,
  LIMIT_3MB,
  MAX_NICKNAME_LENGTH,
  NICKNAME_ALREADY,
  NICKNAME_DIGITS,
  NICKNAME_FORM,
  NICKNAME_INPUT,
  NICKNAME_SLANG
} from 'src/utility/guide';
import { debounce } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';
import useLoginUserId from 'src/hooks/useLoginUserId';

const ProfileSetForm = () => {
  const queryClient = useQueryClient();
  const inputRef = useRef<any>(null);

  const userId = useLoginUserId();
  const filter = new Filter();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [profileImgSrc, setProfileImgSrc] = useState<string>('');
  const [baseImg] = useState(
    'https://wwkfivwrtwucsiwsnisz.supabase.co/storage/v1/object/public/photos/image/profile.png'
  );
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [_, setLoginUser] = useAtom(userAtom);
  const [nickNameColor, setNickNameColor] = useState<string>('black');

  const [isError, setIsError] = useState(false);

  const encodeFileTobase64 = (fileBlob: Blob) => {
    if (fileBlob.size > 3 * 1024 * 1024) {
      toast(LIMIT_3MB);
      return;
    }

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

    handleDebounce(nickname);

    if (nickname === '') {
      setIsError(false);
      setSuccessMessage('편식에서만의 닉네임을 사용해 보세요!');
      return;
    }
    const nicknamePattern = /^[a-zA-Z0-9가-힣_\-]+$/;
    if (!nicknamePattern.test(nickname) && nickname) {
      setIsError(true);
      setErrorMessage(NICKNAME_FORM);
      return;
    }
    if (nickname.length < 2) {
      setIsError(true);
      setErrorMessage(NICKNAME_DIGITS);
      return;
    }
    if (filterdNickName.includes('*')) {
      setIsError(true);
      setErrorMessage(NICKNAME_SLANG);
      return;
    }

    const { data: existingUsers, error: existingUsersError } = await supabase
      .from('users')
      .select('*')
      .eq('nickname', nickname)
      .maybeSingle();

    if (nickname) {
      if (existingUsers) {
        setIsError(true);
        setErrorMessage(NICKNAME_ALREADY);
      } else {
        setIsError(false);
        const randomIndex = Math.floor(Math.random() * CORRECT_NICK_MESSAGES.length);
        const randomMessage = CORRECT_NICK_MESSAGES[randomIndex];
        setSuccessMessage(randomMessage);
      }
    }
  };

  const nickNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  useEffect(() => {
    observeNickName();

    if (nickname.length < MAX_NICKNAME_LENGTH) {
      setNickNameColor('black');
    } else setNickNameColor('red');
  }, [nickname]);

  const setProfile = async () => {
    const filterdNickName = filter.clean(nickname);

    const nicknamePattern = /^[a-zA-Z0-9가-힣_\-]+$/;
    if (!nicknamePattern.test(nickname)) {
      toast(NICKNAME_FORM);
      return;
    }
    if (nickname.length < 2) {
      toast(NICKNAME_DIGITS);
      return;
    }
    if (filterdNickName.includes('*')) {
      toast(NICKNAME_SLANG);
      return;
    }

    let profileImg = profileImgSrc.length !== 0 ? profileImgSrc : baseImg;

    const newUser = {
      nickname,
      profileImg: profileImg
    };
    if (!nickname) {
      toast(NICKNAME_INPUT);
      return;
    }

    const { data, error } = await supabase.from('users').update(newUser).eq('id', userId).select().single();

    queryClient.invalidateQueries(['loginUser']);

    setLoginUser(data);
    toast('회원가입이 완료되었어요!');
    navigate('/');
  };

  const handleDebounce = debounce((nickname: string) => {
    if (nickname.length > MAX_NICKNAME_LENGTH) setNickname((prevNickname) => prevNickname.slice(0, -1));
  }, 10);

  return (
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
          maxLength={MAX_NICKNAME_LENGTH}
          type="text"
          value={nickname}
          placeholder={NICKNAME_INPUT}
          onChange={nickNameHandler}
        />
        <S.InputLimtArea color={nickNameColor}>
          {nickname.length}/{MAX_NICKNAME_LENGTH}
        </S.InputLimtArea>
      </S.InputArea>
      {!isError && <S.SuccessMessage>{successMessage}</S.SuccessMessage>}
      {isError && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
      {isError ? (
        <S.SubmitDisable>편식 시작하기</S.SubmitDisable>
      ) : (
        <S.Submit onClick={setProfile}>편식 시작하기</S.Submit>
      )}
    </S.Container>
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
    object-fit: cover;
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
  `,
  InputLimtArea: styled.div`
    color: ${(props) => props.color};
    padding-right: 1px;
    margin-right: 0.4px;
    font-size: 12px;
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
    width: 294px;
    height: 20px;
    margin: 4px 0px 24px 0px;
    color: #ff7474;
    ${styleFont.bodyMedium}
  `,
  SuccessMessage: styled.div`
    width: 294px;
    height: 20px;
    margin: 4px 0px 24px 0px;
    color: #4285f4;
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
