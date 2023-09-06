import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import { badgeIconMapping } from './BadgeMapping';
import { Badge } from 'src/types/types';

const Achievement = () => {
  const id = useLoginUserId();
  const [userBadges, setUserBadges] = useState<Badge[]>([]);
  const [, setUserData] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (id) {
      async function fetchUserBadges() {
        try {
          const { data, error } = await supabase.from('badge').select('*').eq('user_id', id);

          if (error) {
            throw error;
          }

          const userBadgeData = data && data.length ? data[0] : {};
          setUserData(userBadgeData);

          // 데이터를 이용하여 userBadges 배열을 생성
          const userBadgesData: Badge[] = Object.entries(userBadgeData)
            .filter(([name]) => name !== 'user_id' && name !== 'created_at') // user_id와 created_at 필터링
            .map(([name, yourBooleanProp]) => ({
              name,
              yourBooleanProp: yourBooleanProp as boolean
            }));

          setUserBadges(userBadgesData);
        } catch (error) {
          console.error('뱃지 정보를 가져오는 중 오류 발생:', error);
        }
      }
      fetchUserBadges();
    }
  }, [id]);

  return (
    <S.AchievementContainer>
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
  `
};
