import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { userAtom } from 'src/globalState/jotai';
import useLoginUserId from 'src/hooks/useLoginUserId';
import useUserMutate from 'src/hooks/useUserMutate';
import supabase from 'src/lib/supabaseClient';
import { styled } from 'styled-components';
import { FlexBoxCenter } from 'src/styles/styleBox';
import { deleteUser } from 'src/api/userLogin';

const UserDelete = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const queryClient = useQueryClient();
  const userId = useLoginUserId();

  const [_, setUserLogin] = useAtom(userAtom);
  // const { deleteUserMutate } = useUserMutate();

  const clickWithdraw = async () => {
    //탈퇴를 하겠다고 true를 선택함.
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      // auth/users 테이블에서 유저아이디 값 관련된 데이터 삭제=> 이건 그냥서버로 요청
      const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
      // public / users 테이블 데이터를 삭제 => 이건 그냥서버로 요청
      await deleteUser(userId);
      //로그인된 유저 로그아웃 => 쿼리 실행조건 중 1개
      const { error: singOutError } = await supabase.auth.signOut();
      //혹시 둘중 어떤 로직이라도 오류가 있을시 리턴을 해줌.
      if (deleteError || singOutError) {
        alert('죄송합니다. 고객 센터로 문의 주시기 바랍니다.');
        return;
      }
      setUserLogin(null);
      navigate('/');

      localStorage.removeItem('social');
      queryClient.removeQueries(['loginUser']);
      queryClient.resetQueries(['loginUser']);
    }
  };
  // SQL: grant select on table auth.users to service_role;

  return <S.WithdrawButton onClick={clickWithdraw}>탈퇴하기</S.WithdrawButton>;
};

export default UserDelete;

const S = {
  WithdrawButton: styled(FlexBoxCenter)`
    cursor: pointer;
    width: 350px;
    height: 50px;
    padding: 13px 0px;
    border-radius: 10px;
    background: var(--neutral-300, #d0d5dd);

    color: var(--font-black, var(--Black, #242424));
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  `
};

