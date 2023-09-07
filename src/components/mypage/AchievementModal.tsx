import React from 'react';
import {
  RecipeMania,
  RisingStar,
  Seven,
  Sheriff,
  SilverChair,
  SoilChair,
  BookMark,
  Bug,
  CommentKing,
  Early,
  FirstComment,
  FirstRecipe,
  GoFounded,
  GoldChair,
  Holic,
  KingStar,
  Likes100,
  NewProductUploader,
  OurEmployee,
  FirstNewProductReivew
} from '../mypage/AchievementExport';

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
  } else if (type === 'bookmark') {
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
  component: <RecipeMania />,
  name: '레시피 마니아',
  description: ''
};

const risingStar = {
  component: <RisingStar />,
  name: '떠오르는 별',
  description: ''
};

const sheriff = {
  component: <Sheriff />,
  name: '잡았다 요놈!',
  description: ''
};

const silverChair = {
  component: <SilverChair />,
  name: '그르르갉 프로',
  description: ''
};

const soilChair = {
  component: <SoilChair />,
  name: '그르르갉',
  description: ''
};

const seven = {
  component: <Seven />,
  name: '24/7 편의점 러버',
  description: ''
};

const newProductUploader = {
  component: <NewProductUploader />,
  name: '신제품 업로더',
  description: ''
};

const likes100 = {
  component: <Likes100 />,
  name: '좋아하면 울리는',
  description: ''
};

const kingStar = {
  component: <KingStar />,
  name: '킹킹스타',
  description: ''
};
const holic = {
  component: <Holic />,
  name: '편식 홀릭',
  description: ''
};
const ourEmployee = {
  component: <OurEmployee />,
  name: '최소 본사 직원',
  description: ''
};

const bookmark = {
  component: <BookMark />,
  name: '찾았다 인생조합~',
  description: '레시피 첫 북마크로 획득했어요.'
};
const bug = {
  component: <Bug />,
  name: '사실상 당첨',
  description: ''
};
const commentKing = {
  component: <CommentKing />,
  name: '이 구역 댓글 왕',
  description: ''
};
const early = {
  component: <Early />,
  name: '얼리어 먹터',
  description: ''
};
const firstComment = {
  component: <FirstComment />,
  name: '따뜻함의 시작',
  description: ''
};
const firstNewProductReview = {
  component: <FirstNewProductReivew />,
  name: '이건 꼭 사야해',
  description: ''
};
const firstRecipe = {
  component: <FirstRecipe />,
  name: '나만의 첫 레시피',
  description: ''
};
const goFounded = {
  component: <GoFounded />,
  name: '이쯤되면 창업해',
  description: ''
};
const goldChair = {
  component: <GoldChair />,
  name: '그르르갉 회장님',
  description: ''
};
