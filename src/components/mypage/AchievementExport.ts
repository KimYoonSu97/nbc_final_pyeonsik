//정상 뱃지
export { ReactComponent as BookMark } from '../icons/achievement/BookMark.svg';
export { ReactComponent as Bug } from '../icons/achievement/Bug.svg';
export { ReactComponent as CommentKing } from '../icons/achievement/CommentKing.svg';
export { ReactComponent as Early } from '../icons/achievement/Early.svg';
export { ReactComponent as FirstComment } from '../icons/achievement/FirstComment.svg';
export { ReactComponent as FirstNewProductReivew } from '../icons/achievement/FirstNewProductReivew.svg';
export { ReactComponent as FirstRecipe } from '../icons/achievement/FirstRecipe.svg';
export { ReactComponent as GoFounded } from '../icons/achievement/GoFounded.svg';
export { ReactComponent as GoldChair } from '../icons/achievement/GoldChair.svg';
export { ReactComponent as Holic } from '../icons/achievement/Bug.svg';
export { ReactComponent as KingStar } from '../icons/achievement/KingStar.svg';
export { ReactComponent as Likes100 } from '../icons/achievement/Likes100.svg';
export { ReactComponent as NewProductUploader } from '../icons/achievement/NewProductUploader.svg';
export { ReactComponent as OurEmployee } from '../icons/achievement/OurEmployee.svg';
export { ReactComponent as RecipeMania } from '../icons/achievement/RecipeMania.svg';
export { ReactComponent as RisingStar } from '../icons/achievement/RisingStar.svg';
export { ReactComponent as Seven } from '../icons/achievement/Seven.svg';
export { ReactComponent as Sheriff } from '../icons/achievement/Sheriff.svg';
export { ReactComponent as SilverChair } from '../icons/achievement/SilverChair.svg';
export { ReactComponent as SoilChair } from '../icons/achievement/SoilChair.svg';

//Block 뱃지
export { ReactComponent as BookMarkBlock } from '../icons/achievement/block/BookMarkBlock.svg';
export { ReactComponent as BugBlock } from '../icons/achievement/block/BugBlock.svg';
export { ReactComponent as CommentKingBlock } from '../icons/achievement/block/CommentKingBlock.svg';
export { ReactComponent as EarlyBlock } from '../icons/achievement/block/EarlyBlock.svg';
export { ReactComponent as FirstCommentBlock } from '../icons/achievement/block/FirstCommentBlock.svg';
export { ReactComponent as FirstNewProductReivewBlock } from '../icons/achievement/block/FirstNewProductReivewBlock.svg';
export { ReactComponent as FirstRecipeBlock } from '../icons/achievement/block/FirstRecipeBlock.svg';
export { ReactComponent as GoFoundedBlock } from '../icons/achievement/block/GoFoundedBlock.svg';
export { ReactComponent as GoldChairBlock } from '../icons/achievement/block/GoldChairBlock.svg';
export { ReactComponent as HolicBlock } from '../icons/achievement/block/HolicBlock.svg';
export { ReactComponent as KingStarBlock } from '../icons/achievement/block/KingStarBlock.svg';
export { ReactComponent as Likes100Block } from '../icons/achievement/block/Likes100Block.svg';
export { ReactComponent as NewProductUploaderBlock } from '../icons/achievement/block/NewProductUploaderBlock.svg';
export { ReactComponent as OurEmployeeBlock } from '../icons/achievement/block/OurEmployeeBlock.svg';
export { ReactComponent as RecipeManiaBlock } from '../icons/achievement/block/RecipeManiaBlock.svg';
export { ReactComponent as RisingStarBlock } from '../icons/achievement/block/RisingStarBlock.svg';
export { ReactComponent as SevenBlock } from '../icons/achievement/block/SevenBlock.svg';
export { ReactComponent as SheriffBlock } from '../icons/achievement/block/SheriffBlock.svg';
export { ReactComponent as SilverChairBlock } from '../icons/achievement/block/SilverChairBlock.svg';
export { ReactComponent as SoilChairBlock } from '../icons/achievement/block/SoilChairBlock.svg';

export const calculateUserLevel = (currentLevel: string, postLength: number) => {
  let requiredPostsForNextLevel = 0;
  let nextLevel = '';

  switch (currentLevel) {
    case '수습':
      requiredPostsForNextLevel = 8;
      nextLevel = '알바';
      break;
    case '알바':
      requiredPostsForNextLevel = 15;
      nextLevel = '매니저';
      break;
    case '매니저':
      requiredPostsForNextLevel = 30;
      nextLevel = '부점장';
      break;
    case '부점장':
      requiredPostsForNextLevel = 50;
      nextLevel = '점장';
      break;
    default:
      nextLevel = '점장';
  }

  return { nextLevel, postsNeededForNextLevel: requiredPostsForNextLevel - postLength };
};
