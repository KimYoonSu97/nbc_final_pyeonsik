import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { myPageHover, userAtom, userSettingEmail, userSignUp, writeCategorySelect } from 'src/globalState/jotai';
import supabase from 'src/lib/supabaseClient';
import { css, styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { getUserData } from 'src/api/userLogin';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { useQuery } from '@tanstack/react-query';
import { IconBell } from '../icons';
import { FlexBox, FlexBoxAlignCenter, FlexBoxCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import UserLevel from './UserLevel';
import { toast } from 'react-toastify';
import { EMAIL_CHECK, NON_MEMBER, SERVICE_PREPARING } from 'src/utility/guide';

interface User {
  id: string;
  created_at?: string;
  email: string;
  nickname: string;
  profileImg: string;
}

const TopBarMenuContainer = () => {
  const [nextStep, setNextStep] = useAtom(userSignUp);
  const [userEmail, setUserEmail] = useAtom(userSettingEmail);
  const location = useLocation();
  const [userLogin, setUserLogin] = useAtom(userAtom);
  const [_, setWriteCategory] = useAtom(writeCategorySelect);
  const userId = useLoginUserId();
  const navigate = useNavigate();
  const [myPage, setMyPage] = useAtom(myPageHover);

  const queryKey = userLogin?.id;
  const { data, isLoading, isError } = useQuery(
    ['loginUser'],
    () => {
      if (userId) {
        return getUserData(userId as string);
      } else {
        return getUserData(queryKey as string);
      }
    },
    {
      enabled: userLogin !== null || userId ? true : false
    }
  );

  useEffect(() => {
    if (data && userId) {
      if (data?.data?.profileImg === null && data?.data?.nickname === null) {
        toast('닉네임 프로필 설정 후 이용 가능합니다.');
        setUserEmail(data?.data.email);
        setNextStep(true);
        navigate('/register');
      }
    } else {
      return;
    }
  }, [data, userId]);

  const checkOrSetOAuthUser = async () => {
    const { data: checkLogin, error: checkLoginError } = await supabase.auth.getSession();
    if (checkLoginError) {
      return;
    }
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', checkLogin.session?.user.id)
      .maybeSingle();
    if (data !== null) {
      setUserLogin(data);
    } else {
      const social = localStorage.getItem('social');
      const socialData = checkLogin.session?.user.identities?.filter((item) => {
        if (item.provider === social) {
          return item.identity_data;
        }
      })[0].identity_data;

      const newUser = {
        email: socialData?.email,
        profileImg: socialData?.avatar_url,
        nickname: socialData?.full_name
      };
      const { data: loginUser, error: loginUserError } = await supabase.from('users').insert(newUser).select().single();
      if (error) {
        return;
      }
      setUserLogin(loginUser);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('social') && !data) {
      checkOrSetOAuthUser();
    }
  }, [localStorage.getItem('social')]);

  const clickReview = () => {
    if (!userId && !userLogin) {
      toast(NON_MEMBER);
      return;
    }
    navigate('/review_swiper');
  };

  return (
    <S.TopBarMenuContainer>
      <S.QuickButtonArea>
        <S.QuickPostButton
          onClick={() => {
            if (!userId && !userLogin) {
              toast(EMAIL_CHECK);
              return;
            }
            setWriteCategory('recipe');
            navigate('/write');
          }}
        >
          나만의 편식조합 공유하기
        </S.QuickPostButton>
        <S.QuickButton onClick={clickReview}>신상품 리뷰하기</S.QuickButton>
      </S.QuickButtonArea>
      <S.TopBarLogContainer as="ul" $logged={data ? true : false}>
        {data === undefined || data === null ? (
          <>
            <S.TopBarLogButton
              as="li"
              onClick={() => navigate('/login', { state: { backgroundLocation: location } })}
              $signIn={false}
            >
              로그인
            </S.TopBarLogButton>
            <S.TopBarLogButton as="li" onClick={() => navigate('/register')} $signIn={true}>
              회원가입
            </S.TopBarLogButton>
          </>
        ) : (
          <>
            <S.Icon>
              <IconBell />
            </S.Icon>
            <UserLevel level={data?.data?.level} />
            <S.ProfileImg
              $url={data?.data?.profileImg}
              onClick={() => {
                navigate('/mypage/profile');
              }}
              onMouseOver={() => {
                setMyPage(true);
              }}
            />
          </>
        )}
      </S.TopBarLogContainer>
    </S.TopBarMenuContainer>
  );
};

export default TopBarMenuContainer;

interface Props {
  $signIn?: boolean;
}
interface ImageProps {
  $url?: string;
}

const S = {
  TopBarMenuContainer: styled(FlexBoxAlignCenter)`
    gap: 24px;

    position: absolute;
    right: 16px;
  `,

  TopBarListContainer: styled.ul`
    display: flex;
  `,

  QuickButtonArea: styled(FlexBoxAlignCenter)`
    gap: 8px;
  `,

  QuickButton: styled(FlexBoxAlignCenter)`
    border-radius: 100px;
    border: 1px solid var(--neutral-200, #e4e7ec);
    padding: 3px 18px;
    height: 34px;
    color: var(--font-black, var(--Black, #242424));
    cursor: pointer;

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    &:hover {
      border: 1px solid var(--main, #f02826);
    }
  `,
  QuickPostButton: styled(FlexBoxAlignCenter)`
    border-radius: 100px;
    border: 1px solid var(--neutral-200, #e4e7ec);
    padding: 3px 18px;
    height: 34px;
    color: var(--font-black, var(--Black, #242424));
    cursor: pointer;

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    &:hover {
      box-shadow: 0px 0px 6px 0px rgba(255, 116, 116, 0.5);

      border: 1px solid var(--main, #f02826);
    }
  `,
  TopBarLogContainer: styled(FlexBoxAlignCenter)<{ $logged: boolean }>`
    gap: ${(props) => (props.$logged ? '0px' : '12px')};
  `,

  TopBarLogButton: styled(FlexBoxCenter)<Props>`
    cursor: pointer;

    border-radius: 4px;
    height: 30px;
    padding: 5px 15px;

    ${styleFont.buttonSmall}

    color: ${(props) => {
      if (props.$signIn) {
        return ' var(--white, #FFF)';
      } else {
        return 'var(--font-black, var(--black, #242424))';
      }
    }};

    background: ${(props) => {
      if (props.$signIn) {
        return 'var(--main, #F02826);';
      } else {
        return 'var(--neutral-200, #e4e7ec)';
      }
    }};

    ${(props) => {
      if (props.$signIn) {
        return css`
          &:hover {
            box-shadow: 0px 0px 6px 0px #ff7474;
          }
        `;
      } else {
        return css`
          border: 1px solid var(--font-black, #e4e7ec);
          &:hover {
            border: 1px solid var(--font-black, #242424);
          }
        `;
      }
    }};
  `,

  Icon: styled.div`
    width: 20px;
    height: 20px;
    background-color: black;
    margin-right: 8px;
  `,

  ProfileImgArea: styled.div`
    position: fixed;
  `,

  ProfileTapMenu: styled(FlexBox)`
    top: 0;
    right: calc((100vw - 1280px) / 2 + 16px);

    position: fixed;
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  `,

  ProfileImg: styled.div<ImageProps>`
    cursor: pointer;

    position: relative;
    z-index: 9999;
    background-image: ${(props) => {
      return `url(${props.$url})`;
    }};
    background-size: contain;
    background-position: center;
    width: 36px;
    height: 36px;
    margin-left: 4px;

    border-radius: 100px;
  `
};
