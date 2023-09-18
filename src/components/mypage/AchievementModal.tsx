import React from 'react';
import {
  IconRecipeMania,
  IconRisingStar,
  IconSheriff,
  IconSilverChair,
  IconSoilChair,
  IconSeven,
  IconNewProductUploader,
  IconLikes100,
  IconKingStar,
  IconHolic,
  IconOurEmployee,
  IconBookMark,
  IconBug,
  IconCommentKing,
  IconEarly,
  IconFirstComment,
  IconFirstNewProductReview,
  IconFirstRecipe,
  IconGoFounded,
  IconGoldChair
} from '../icons/achievement/modal';

interface AchievementType {
  component: JSX.Element;
  name: string;
  description: string;
}

const AchievementModal = (type: string): AchievementType => {
  let result: AchievementType;

  if (type === 'firstRecipe') {
    result = firstRecipe;
  } else if (type === 'goFounded') {
    result = goFounded;
  } else if (type === 'goldChair') {
    result = goldChair;
  } else if (type === 'firstNewProductReview') {
    result = firstNewProductReview;
  } else if (type === 'firstComment') {
    result = firstComment;
  } else if (type === 'early') {
    result = early;
  } else if (type === 'commentKing') {
    result = commentKing;
  } else if (type === 'bug') {
    result = bug;
  } else if (type === 'bookMark') {
    result = bookmark;
  } else if (type === 'ourEmployee') {
    result = ourEmployee;
  } else if (type === 'holic') {
    result = holic;
  } else if (type === 'kingStar') {
    result = kingStar;
  } else if (type === 'likes100') {
    result = likes100;
  } else if (type === 'newProductUploader') {
    result = newProductUploader;
  } else if (type === 'seven') {
    result = seven;
  } else if (type === 'soilChair') {
    result = soilChair;
  } else if (type === 'silverChair') {
    result = silverChair;
  } else if (type === 'sheriff') {
    result = sheriff;
  } else if (type === 'recipeMania') {
    result = recipeMania;
  } else if (type === 'risingStar') {
    result = risingStar;
  }

  return result!;
};

export default AchievementModal;

const recipeMania = {
  component: <IconRecipeMania />,
  name: '레시피 마니아',
  description: ''
};

const risingStar = {
  component: <IconRisingStar />,
  name: '떠오르는 별',
  description: ''
};

const sheriff = {
  component: <IconSheriff />,
  name: '잡았다 요놈!',
  description: ''
};

const silverChair = {
  component: <IconSilverChair />,
  name: '그르르갉 프로',
  description: ''
};

const soilChair = {
  component: <IconSoilChair />,
  name: '그르르갉',
  description: ''
};

const seven = {
  component: <IconSeven />,
  name: '24/7 편의점 러버',
  description: ''
};

const newProductUploader = {
  component: <IconNewProductUploader />,
  name: '신상품 업로더',
  description: ''
};

const likes100 = {
  component: <IconLikes100 />,
  name: '좋아하면 울리는',
  description: ''
};

const kingStar = {
  component: <IconKingStar />,
  name: '킹킹스타',
  description: ''
};
const holic = {
  component: <IconHolic />,
  name: '편식 홀릭',
  description: ''
};
const ourEmployee = {
  component: <IconOurEmployee />,
  name: '최소 본사 직원',
  description: ''
};

const bookmark = {
  component: <IconBookMark />,
  name: '찾았다 인생조합~',
  description: '레시피 첫 북마크로 획득했어요.'
};
const bug = {
  component: <IconBug />,
  name: '사실상 당첨',
  description: ''
};
const commentKing = {
  component: <IconCommentKing />,
  name: '이 구역 댓글 왕',
  description: ''
};
const early = {
  component: <IconEarly />,
  name: '얼리어 먹터',
  description: ''
};
const firstComment = {
  component: <IconFirstComment />,
  name: '따뜻함의 시작',
  description: ''
};
const firstNewProductReview = {
  component: <IconFirstNewProductReview />,
  name: '이건 꼭 사야해',
  description: ''
};
const firstRecipe = {
  component: <IconFirstRecipe />,
  name: '나만의 첫 레시피',
  description: ''
};
const goFounded = {
  component: <IconGoFounded />,
  name: '이쯤되면 창업해',
  description: ''
};
const goldChair = {
  component: <IconGoldChair />,
  name: '그르르갉 회장님',
  description: ''
};
