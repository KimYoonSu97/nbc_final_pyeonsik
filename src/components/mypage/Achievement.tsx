import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import { badgeIconMapping } from './BadgeMapping';
import { Badge } from 'src/types/types';
import { FlexBoxCenter } from 'src/styles/styleBox';
import { calculateUserLevel } from './AchievementExport';

interface UserData {
  nickname?: string;
  level?: string;
}

const Achievement = () => {
  const id = useLoginUserId();
  const [userBadges, setUserBadges] = useState<Badge[]>([]);
  const [userLevel, setUserLevel] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [postLength, setPostLength] = useState<number>(0);
  const [postsNeededForNextLevel, setPostsNeededForNextLevel] = useState<number>(0);
  const [, setUserData] = useState<{ [key: string]: boolean }>({});
  console.log(userLevel);

  useEffect(() => {
    if (id) {
      const fetchUserLevel = async () => {
        try {
          const { data: userData, error } = await supabase.from('users').select('nickname, level').eq('id', id);
          if (error) {
            throw error;
          }

          const user: UserData = userData && userData.length ? userData[0] : {};
          setNickname(user.nickname || '');

          setUserLevel(user.level || '수습');
        } catch (error) {
          console.error('유저 레벨 정보를 가져오는 중 오류 발생:', error);
        }
      };

      fetchUserLevel();
    }
    const fetchUserPosts = async () => {
      try {
        const { data: userPosts, error } = await supabase.from('posts').select('*').eq('userId', id);

        if (error) {
          throw error;
        }
        const numberOfPosts = userPosts ? userPosts.length : 0;

        setPostLength(numberOfPosts);
        const { nextLevel, postsNeededForNextLevel } = calculateUserLevel(userLevel || '수습', numberOfPosts);
        console.log('여기야 여기', nextLevel);
        console.log('userLevel', userLevel);
        setPostsNeededForNextLevel(postsNeededForNextLevel);
      } catch (error) {
        console.error('유저 글을 가져오는 중 오류 발생:', error);
      }
    };

    fetchUserPosts();
    const fetchUserBadges = async () => {
      try {
        const { data, error } = await supabase.from('badge').select('*').eq('user_id', id);

        if (error) {
          throw error;
        }

        const userBadgeData = data && data.length ? data[0] : {};
        setUserData(userBadgeData);

        const userBadgesData: Badge[] = Object.entries(userBadgeData)
          .filter(([name]) => name !== 'user_id' && name !== 'created_at')
          .map(([name, yourBooleanProp]) => ({
            name,
            yourBooleanProp: yourBooleanProp as boolean
          }));

        setUserBadges(userBadgesData);
      } catch (error) {
        console.error('뱃지 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchUserBadges();
  }, [id]);

  console.log('postsNeededForNextLevel', postsNeededForNextLevel);

  return (
    <S.AchievementContainer>
      <S.NickNameContainer>
        <S.NickName>{nickname}</S.NickName>
        <S.span>님의 편식 업적</S.span>
      </S.NickNameContainer>
      <S.LevelContainer>
        <S.Level>Lv. {userLevel}</S.Level>
      </S.LevelContainer>
      <S.NextLevelText>편식 조합을 {postsNeededForNextLevel}개 더 작성한다면 좋은 일이 있을지도?</S.NextLevelText>

      <S.BadgeWarpper>
        {userBadges.map((badge) => (
          <div key={badge.name}>
            {badgeIconMapping[badge.name] ? (
              badgeIconMapping[badge.name][badge.yourBooleanProp ? 'normal' : 'blocked']
            ) : (
              <div>아이콘 없음</div>
            )}
          </div>
        ))}
      </S.BadgeWarpper>
    </S.AchievementContainer>
  );
};
export default Achievement;

const S = {
  AchievementContainer: styled.div`
    position: relative;
    width: 98px;
    height: 98px;
  `,
  BadgeWarpper: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  `,
  NickNameContainer: styled(FlexBoxCenter)`
    margin-left: 250px;
    margin-bottom: 10px;
    width: 274px;
    height: 50px;
  `,
  span: styled.div`
    font-size: 24px;
    font-weight: 700;
    font-family: Pretendard;
    color: #475467;
  `,
  LevelContainer: styled(FlexBoxCenter)`
    border-radius: 10px;
    border: 2px solid transparent;
    background-image: linear-gradient(#fff, #fff), linear-gradient(to right, #d9d9d9 0%, #ffb334 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;

    margin-left: 250px;
    width: 274px;
    height: 50px;
  `,
  Level: styled.div`
    font-size: 24px;
    font-weight: 700;
    font-family: Pretendard;
  `,
  NickName: styled.div`
    font-size: 24px;
    font-weight: 700;
    font-family: Pretendard;
    color: #242424;
  `,
  NextLevelText: styled.div`
    width: 282px;
    font-size: 14px;
    font-weight: 400;
    font-family: Pretendard;
    margin-left: 250px;
    margin-bottom: 50px;
  `
};
