# Project "편식"

### 편의점 음식을 조합하고 공유하는 community

### 📆 2023.08.16-2023.09.15

<br/>

🔗 [IP 주소](https://tripshare-theta.vercel.app/)

📜 [S.A(Starting Assignments)](https://www.notion.so/SE7EN-DAYS-S-A-18c506d357b743c78f58a76550c92d40)

#### 📌 핵심 기능

- 편의점 상품을 사진에 태그 하는 ‘편식 조합’ 게시글 작성/수정/삭제
- 게시글 댓글, 좋아요, 저장, 공유, 그리고 인용
- 신상품을 평가하고 그 결과를 볼 수 있는 목록
- 편의점별 가까운 지점 안내
- 활동에 따른 배지 지급 및 레벨 업
- 다양한 편의점 행사 할인 품목 및 게시글 검색

<br/>

## 구성원

|                   이름                   |    역할     | <center/>담당                                                  |
| :--------------------------------------: | :---------: | :------------------------------------------------------------- |
|   [김윤수](https://velog.io/@zkzk625)    |   leader    | 전체 프로젝트 일정 관리, 데이터 구축 및 개발 총괄              |
|   [이혜영](https://velog.io/@kkotburi)   | vice leader | 일반 게시글 및 게시글 부가 기능, 신제품 리뷰 결과 리스트       |
|   [원유길](https://d161.tistory.com/)    |   member    | 데이터 구축, 이미지 태그 게시글 관련 기능                      |
|  [임호진](https://hojin96.tistory.com/)  |   member    | 인증/인가, 주변 편의점 안내, 스켈레톤 UI                       |
| [황대성](https://reactprac.tistory.com/) |   member    | 댓글 관련 기능, 고객센터, 신제품 리뷰 스와이프                 |
|    [최정윤](https://www.yun-dna.com/)    |  designer   | 사용자 플로우 작성, UI/UX 디자인 및 시스템, 서비스 로고 디자인 |

<br/>

## Tech Stack

### FE

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react_router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/react_query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/jotai-FFFFFF?style=for-the-badge">

### BE

<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">

<img src="https://img.shields.io/badge/nodedot.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white">

##

### LIBRARY

<img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">

<img src="https://img.shields.io/badge/lodash-3492FF?style=for-the-badge&logo=lodash&logoColor=white"> <img src="https://img.shields.io/badge/babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black">

<img src="https://img.shields.io/badge/testing_library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white"> <img src="https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white">

### API

<img src="https://img.shields.io/badge/kakao_maps_api-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">

### HOSTING

<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

### VERSION CONTROL

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### COOPERATION

<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge">

### ETC.

<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black"> <img src="https://img.shields.io/badge/.env-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black"> <img src="https://img.shields.io/badge/visual_studio_code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">

<br/>

## Process Guide

1. &nbsp;환경 변수(.env) 설정
2. `yarn` package 설치
3. `yarn start` client 실행

<br/>

## Commit Convention

**Chore**: build 업무, package manager 수정, package 관리자 구성 update 등<br/>
**Docs** 문서 수정<br/>
**Feat**: 새로운 기능 추가<br/>
**Fix**: bug 수정<br/>
**Comment**: 필요한 주석 추가 및 변경<br/>
**Style**: code fomat 변경, semi colon 누락<br/>
**Refactor**: code refactoring<br/>
**Design**: UI Design 변경 (styled-component)<br/>
**Rename**: folder, file 이름 수정 및 이동<br/>
**Remove**: file 삭제<br/>
**Test**: test code<br/>

<br/>

## File Tree

📦src
┣ 📂api
┃ ┣ 📂mainPage
┃ ┃ ┗ 📜getPostInfinity.ts
┃ ┣ 📜badge.ts
┃ ┣ 📜bestComment.ts
┃ ┣ 📜comment.ts
┃ ┣ 📜commentLike.ts
┃ ┣ 📜postBookmark.ts
┃ ┣ 📜postLikes.ts
┃ ┣ 📜posts.ts
┃ ┣ 📜product.ts
┃ ┣ 📜ReComment.ts
┃ ┣ 📜ReCommentLike.ts
┃ ┣ 📜ReviewSwiper.ts
┃ ┗ 📜userLogin.ts
┣ 📂components
┃ ┣ 📂detail
┃ ┃ ┣ 📂comments
┃ ┃ ┃ ┣ 📜Comment.tsx
┃ ┃ ┃ ┣ 📜CommentForMap.tsx
┃ ┃ ┃ ┣ 📜CommentInput.tsx
┃ ┃ ┃ ┣ 📜CommentLikes.tsx
┃ ┃ ┃ ┣ 📜CommentUserInfo.tsx
┃ ┃ ┃ ┣ 📜ReCommentForMap.tsx
┃ ┃ ┃ ┣ 📜ReCommentInput.tsx
┃ ┃ ┃ ┣ 📜ReCommentLikes.tsx
┃ ┃ ┃ ┗ 📜styledComments.ts
┃ ┃ ┗ 📂prodReview
┃ ┃ ┃ ┣ 📜EvaluationGraph.tsx
┃ ┃ ┃ ┣ 📜MyEvaluation.tsx
┃ ┃ ┃ ┣ 📜ProdReviewSwiper.tsx
┃ ┃ ┃ ┣ 📜ReviewList.tsx
┃ ┃ ┃ ┣ 📜ReviewLocation.tsx
┃ ┃ ┃ ┗ 📜ReviewProduct.tsx
┃ ┣ 📂eventProd
┃ ┃ ┣ 📜ProdCard.tsx
┃ ┃ ┗ 📜ProdList.tsx
┃ ┣ 📂header
┃ ┃ ┣ 📂search
┃ ┃ ┃ ┗ 📜SearchResult.tsx
┃ ┃ ┣ 📂write_edit
┃ ┃ ┃ ┗ 📜WriteHeader.tsx
┃ ┃ ┣ 📜BoardSearchContainer.tsx
┃ ┃ ┣ 📜BottomBarMenuContainer.tsx
┃ ┃ ┣ 📜Header.tsx
┃ ┃ ┣ 📜HeaderSearchBar.tsx
┃ ┃ ┣ 📜TopBarMenuContainer.tsx
┃ ┃ ┗ 📜UserLevel.tsx
┃ ┣ 📂icons
┃ ┃ ┣ 📂achievement
┃ ┃ ┃ ┣ 📂block
┃ ┃ ┃ ┃ ┣ 📜BookMarkBlock.svg
┃ ┃ ┃ ┃ ┣ 📜BugBlock.svg
┃ ┃ ┃ ┃ ┣ 📜CommentKingBlock.svg
┃ ┃ ┃ ┃ ┣ 📜EarlyBlock.svg
┃ ┃ ┃ ┃ ┣ 📜FirstCommentBlock.svg
┃ ┃ ┃ ┃ ┣ 📜FirstNewProductReivewBlock.svg
┃ ┃ ┃ ┃ ┣ 📜FirstRecipeBlock.svg
┃ ┃ ┃ ┃ ┣ 📜GoFoundedBlock.svg
┃ ┃ ┃ ┃ ┣ 📜GoldChairBlock.svg
┃ ┃ ┃ ┃ ┣ 📜HolicBlock.svg
┃ ┃ ┃ ┃ ┣ 📜KingStarBlock.svg
┃ ┃ ┃ ┃ ┣ 📜Likes100Block.svg
┃ ┃ ┃ ┃ ┣ 📜NewProductUploaderBlock.svg
┃ ┃ ┃ ┃ ┣ 📜OurEmployeeBlock.svg
┃ ┃ ┃ ┃ ┣ 📜RecipeManiaBlock.svg
┃ ┃ ┃ ┃ ┣ 📜RisingStarBlock.svg
┃ ┃ ┃ ┃ ┣ 📜SevenBlock.svg
┃ ┃ ┃ ┃ ┣ 📜SheriffBlock.svg
┃ ┃ ┃ ┃ ┣ 📜SilverChairBlock.svg
┃ ┃ ┃ ┃ ┗ 📜SoilChairBlock.svg
┃ ┃ ┃ ┣ 📂modal
┃ ┃ ┃ ┃ ┣ 📜IconBookMark.svg
┃ ┃ ┃ ┃ ┣ 📜IconBug.svg
┃ ┃ ┃ ┃ ┣ 📜IconCommentKing.svg
┃ ┃ ┃ ┃ ┣ 📜IconEarly.svg
┃ ┃ ┃ ┃ ┣ 📜IconFirstComment.svg
┃ ┃ ┃ ┃ ┣ 📜IconFirstNewProductReview.svg
┃ ┃ ┃ ┃ ┣ 📜IconFirstRecipe.svg
┃ ┃ ┃ ┃ ┣ 📜IconGoFounded.svg
┃ ┃ ┃ ┃ ┣ 📜IconGoldChair.svg
┃ ┃ ┃ ┃ ┣ 📜IconHolic.svg
┃ ┃ ┃ ┃ ┣ 📜IconKingStar.svg
┃ ┃ ┃ ┃ ┣ 📜IconLikes100.svg
┃ ┃ ┃ ┃ ┣ 📜IconNewProductUploader.svg
┃ ┃ ┃ ┃ ┣ 📜IconOurEmployee.svg
┃ ┃ ┃ ┃ ┣ 📜IconRecipeMania.svg
┃ ┃ ┃ ┃ ┣ 📜IconRisingStar.svg
┃ ┃ ┃ ┃ ┣ 📜IconSeven.svg
┃ ┃ ┃ ┃ ┣ 📜IConSheriff.svg
┃ ┃ ┃ ┃ ┣ 📜IconSilverChair.svg
┃ ┃ ┃ ┃ ┣ 📜IconSoilChair.svg
┃ ┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┃ ┣ 📜BookMark.svg
┃ ┃ ┃ ┣ 📜Bug.svg
┃ ┃ ┃ ┣ 📜CommentKing.svg
┃ ┃ ┃ ┣ 📜Early.svg
┃ ┃ ┃ ┣ 📜FirstComment.svg
┃ ┃ ┃ ┣ 📜FirstNewProductReivew.svg
┃ ┃ ┃ ┣ 📜FirstRecipe.svg
┃ ┃ ┃ ┣ 📜GoFounded.svg
┃ ┃ ┃ ┣ 📜GoldChair.svg
┃ ┃ ┃ ┣ 📜Holic.svg
┃ ┃ ┃ ┣ 📜KingStar.svg
┃ ┃ ┃ ┣ 📜Likes100.svg
┃ ┃ ┃ ┣ 📜NewProductUploader.svg
┃ ┃ ┃ ┣ 📜OurEmployee.svg
┃ ┃ ┃ ┣ 📜RecipeMania.svg
┃ ┃ ┃ ┣ 📜RisingStar.svg
┃ ┃ ┃ ┣ 📜Seven.svg
┃ ┃ ┃ ┣ 📜Sheriff.svg
┃ ┃ ┃ ┣ 📜SilverChair.svg
┃ ┃ ┃ ┗ 📜SoilChair.svg
┃ ┃ ┣ 📂brand
┃ ┃ ┃ ┣ 📜CU.svg
┃ ┃ ┃ ┣ 📜Emart24.svg
┃ ┃ ┃ ┣ 📜GS25.svg
┃ ┃ ┃ ┗ 📜SevenEleven.svg
┃ ┃ ┣ 📂login
┃ ┃ ┃ ┗ 📜IconWarning.svg
┃ ┃ ┣ 📂map
┃ ┃ ┃ ┣ 📜IconLocation.svg
┃ ┃ ┃ ┗ 📜IconMap.svg
┃ ┃ ┣ 📂mypage
┃ ┃ ┃ ┣ 📜IconLogOut.svg
┃ ┃ ┃ ┗ 📜IconSecret.svg
┃ ┃ ┣ 📂post
┃ ┃ ┃ ┣ 📂recipe
┃ ┃ ┃ ┃ ┣ 📜AddBtn.svg
┃ ┃ ┃ ┃ ┣ 📜ArrowIcon.svg
┃ ┃ ┃ ┃ ┣ 📜CameraIcon.svg
┃ ┃ ┃ ┃ ┣ 📜DeleteIcon.svg
┃ ┃ ┃ ┃ ┣ 📜DotIcon.svg
┃ ┃ ┃ ┃ ┣ 📜SearchIcon.svg
┃ ┃ ┃ ┃ ┣ 📜SelectedFileIcon.svg
┃ ┃ ┃ ┃ ┣ 📜TagIcon.svg
┃ ┃ ┃ ┃ ┗ 📜TrashCanIcon.svg
┃ ┃ ┃ ┣ 📜IconAdd.svg
┃ ┃ ┃ ┣ 📜IconBookmark.svg
┃ ┃ ┃ ┣ 📜IconClose.svg
┃ ┃ ┃ ┣ 📜IconComment.svg
┃ ┃ ┃ ┣ 📜IconLike.svg
┃ ┃ ┃ ┣ 📜IconLink.svg
┃ ┃ ┃ ┣ 📜IconLinkCopy.svg
┃ ┃ ┃ ┣ 📜IconLinkFacebook.svg
┃ ┃ ┃ ┣ 📜IconLinkKakao.svg
┃ ┃ ┃ ┣ 📜IconLinkTwitter.svg
┃ ┃ ┃ ┣ 📜IconOrgPost.svg
┃ ┃ ┃ ┣ 📜IconQuotation.svg
┃ ┃ ┃ ┣ 📜IconSelect.svg
┃ ┃ ┃ ┣ 📜IconUnBookmark.svg
┃ ┃ ┃ ┣ 📜IconUnLike.svg
┃ ┃ ┃ ┣ 📜IconUnLink.svg
┃ ┃ ┃ ┗ 📜IconUnQuotation.svg
┃ ┃ ┣ 📂register
┃ ┃ ┃ ┣ 📜IconConsent.svg
┃ ┃ ┃ ┣ 📜IconConsentConfirm.svg
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📂report
┃ ┃ ┃ ┗ 📜IconReport.svg
┃ ┃ ┣ 📂review
┃ ┃ ┃ ┗ 📜IconGood.svg
┃ ┃ ┣ 📂search
┃ ┃ ┃ ┗ 📜IconNoSearchResult.svg
┃ ┃ ┣ 📂write
┃ ┃ ┃ ┣ 📜IconCommon.svg
┃ ┃ ┃ ┗ 📜IconRecipe.svg
┃ ┃ ┣ 📜IconAddReComment.svg
┃ ┃ ┣ 📜IconAllReview.svg
┃ ┃ ┣ 📜IconBackSpace.svg
┃ ┃ ┣ 📜IconBad.svg
┃ ┃ ┣ 📜IconBadFace.svg
┃ ┃ ┣ 📜IconBadge.svg
┃ ┃ ┣ 📜IconBadgeSmall.svg
┃ ┃ ┣ 📜IconBell.svg
┃ ┃ ┣ 📜IconBestComment.svg
┃ ┃ ┣ 📜IconCamera.svg
┃ ┃ ┣ 📜IconCameraSmall.svg
┃ ┃ ┣ 📜IconCommentInput.svg
┃ ┃ ┣ 📜IconCommon.svg
┃ ┃ ┣ 📜IconGoodBig.svg
┃ ┃ ┣ 📜IconGoodFace.svg
┃ ┃ ┣ 📜IconGoogle.svg
┃ ┃ ┣ 📜IconKaKao.svg
┃ ┃ ┣ 📜IconLiked.svg
┃ ┃ ┣ 📜IconLogoSymbolH22.svg
┃ ┃ ┣ 📜IconLogoSymbolH32.svg
┃ ┃ ┣ 📜IconLogoWaterMarkH22.svg
┃ ┃ ┣ 📜IconLogoWaterMarkH32.svg
┃ ┃ ┣ 📜IconMyPostBox.svg
┃ ┃ ┣ 📜IconPlusTag.svg
┃ ┃ ┣ 📜IconProfile.svg
┃ ┃ ┣ 📜IconRecipe.svg
┃ ┃ ┣ 📜IconUnLiked.svg
┃ ┃ ┣ 📜IconWriteButton.svg
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂imageTag
┃ ┃ ┣ 📂svg
┃ ┃ ┃ ┣ 📜ArrowIcon.svg
┃ ┃ ┃ ┣ 📜CameraIcon.svg
┃ ┃ ┃ ┣ 📜DeleteIcon.svg
┃ ┃ ┃ ┣ 📜DotIcon.svg
┃ ┃ ┃ ┣ 📜IconAddBtn.svg
┃ ┃ ┃ ┣ 📜SearchIcon.svg
┃ ┃ ┃ ┣ 📜SelectedFileIcon.svg
┃ ┃ ┃ ┣ 📜TagIcon.svg
┃ ┃ ┃ ┗ 📜TrashCanIcon.svg
┃ ┃ ┣ 📜AddImageTagComponent.tsx
┃ ┃ ┣ 📜ImageTag.tsx
┃ ┃ ┣ 📜ImageUploader.tsx
┃ ┃ ┣ 📜Search.tsx
┃ ┃ ┣ 📜ShowTag.tsx
┃ ┃ ┣ 📜StyledAddImageTagComponent.ts
┃ ┃ ┣ 📜StyledImageTag.ts
┃ ┃ ┣ 📜StyledShowTag.ts
┃ ┃ ┗ 📜TagModal.tsx
┃ ┣ 📂mypage
┃ ┃ ┣ 📜Achievement.tsx
┃ ┃ ┣ 📜AchievementExport.ts
┃ ┃ ┣ 📜AchievementModal.tsx
┃ ┃ ┣ 📜BadgeMapping.tsx
┃ ┃ ┣ 📜MyAchievement.tsx
┃ ┃ ┣ 📜MyPageHover.tsx
┃ ┃ ┣ 📜MyPost.tsx
┃ ┃ ┣ 📜NoPost.tsx
┃ ┃ ┗ 📜Profile.tsx
┃ ┣ 📂popUp
┃ ┃ ┣ 📜BadgeAlert.tsx
┃ ┃ ┣ 📜BoardAlert.tsx
┃ ┃ ┣ 📜Confirm.tsx
┃ ┃ ┣ 📜confirmModalText.ts
┃ ┃ ┗ 📜UserDeleteAlert.tsx
┃ ┣ 📂post
┃ ┃ ┣ 📂detail
┃ ┃ ┃ ┣ 📜BottomFunction.tsx
┃ ┃ ┃ ┣ 📜BottomShare.tsx
┃ ┃ ┃ ┣ 📜OrgPostCard.tsx
┃ ┃ ┃ ┣ 📜PostDetail.tsx
┃ ┃ ┃ ┣ 📜StyledBottomFunction.ts
┃ ┃ ┃ ┣ 📜StyledOrgPostCard.ts
┃ ┃ ┃ ┣ 📜StyledPostDetail.ts
┃ ┃ ┃ ┗ 📜WriterInfo.tsx
┃ ┃ ┣ 📂write
┃ ┃ ┃ ┣ 📜EditorQuill.tsx
┃ ┃ ┃ ┣ 📜HeaderArea.tsx
┃ ┃ ┃ ┣ 📜PostWrite.tsx
┃ ┃ ┃ ┣ 📜PostWriteBodyInput.tsx
┃ ┃ ┃ ┣ 📜Select.tsx
┃ ┃ ┃ ┣ 📜StyledEditorQuill.css
┃ ┃ ┃ ┣ 📜StyledHeaderArea.ts
┃ ┃ ┃ ┣ 📜StyledPostWrite.ts
┃ ┃ ┃ ┣ 📜StyledTitleArea.ts
┃ ┃ ┃ ┣ 📜TitleArea.tsx
┃ ┃ ┃ ┗ 📜userLevelUp.ts
┃ ┃ ┣ 📜PostEditCommon.tsx
┃ ┃ ┣ 📜PostEditRecipe.tsx
┃ ┃ ┗ 📜PostList.tsx
┃ ┣ 📂register
┃ ┃ ┣ 📜ProfileSetForm.tsx
┃ ┃ ┣ 📜SignUpForm.tsx
┃ ┃ ┣ 📜TermsAndConditions.tsx
┃ ┃ ┗ 📜UserDelete.tsx
┃ ┣ 📂renderPosts
┃ ┃ ┣ 📂reactionSource
┃ ┃ ┃ ┣ 📜BestComment.tsx
┃ ┃ ┃ ┣ 📜ContentBox.tsx
┃ ┃ ┃ ┗ 📜WriterContainer.tsx
┃ ┃ ┣ 📜CommonPost.tsx
┃ ┃ ┣ 📜PostCards.tsx
┃ ┃ ┗ 📜PostForMain.tsx
┃ ┣ 📂report
┃ ┃ ┗ 📜ReportIcon.tsx
┃ ┣ 📂search
┃ ┃ ┣ 📜NoSearchResult.tsx
┃ ┃ ┣ 📜Prodfilter.ts
┃ ┃ ┣ 📜ProdSearch.tsx
┃ ┃ ┗ 📜SearchSummary.tsx
┃ ┣ 📂sidebar
┃ ┃ ┣ 📂event
┃ ┃ ┃ ┣ 📜BrandSelector.tsx
┃ ┃ ┃ ┣ 📜EventSideBar.tsx
┃ ┃ ┃ ┣ 📜NearBy.tsx
┃ ┃ ┃ ┗ 📜NearByBox.tsx
┃ ┃ ┣ 📂mypage
┃ ┃ ┃ ┣ 📜BadgeCount.tsx
┃ ┃ ┃ ┣ 📜MypageSideBar.tsx
┃ ┃ ┃ ┣ 📜MypageSideBarButtonTab.tsx
┃ ┃ ┃ ┗ 📜MypageSideBarInfo.tsx
┃ ┃ ┣ 📂rank
┃ ┃ ┃ ┣ 📜EvaluationGood.tsx
┃ ┃ ┃ ┣ 📜NewReview.tsx
┃ ┃ ┃ ┣ 📜RankSideBar.tsx
┃ ┃ ┃ ┣ 📜RealTimeCombo.tsx
┃ ┃ ┃ ┗ 📜StyledRealTimeCombo.ts
┃ ┃ ┣ 📜FetchPosts.tsx
┃ ┃ ┣ 📜Footer.tsx
┃ ┃ ┗ 📜SideBar.tsx
┃ ┣ 📂skeleton
┃ ┃ ┣ 📜PostSkeleton.tsx
┃ ┃ ┗ 📜ProdSkeleton.tsx
┃ ┣ 📜OAuthLogin.tsx
┃ ┗ 📜ProgressCircle.tsx
┣ 📂d.ts
┃ ┗ 📜badwords.d.ts
┣ 📂function
┃ ┣ 📜GetDistanceBtw.ts
┃ ┗ 📜setBrandName.ts
┣ 📂globalState
┃ ┗ 📜jotai.ts
┣ 📂hooks
┃ ┣ 📜useCommentMutate.ts
┃ ┣ 📜useInput.ts
┃ ┣ 📜useLoginUserId.ts
┃ ┣ 📜usePost.ts
┃ ┣ 📜usePostBookmark.ts
┃ ┣ 📜usePostLikes.ts
┃ ┣ 📜useReCommentMutate.ts
┃ ┗ 📜useUserMutate.ts
┣ 📂kakaoMap
┃ ┣ 📜GetConvList.ts
┃ ┣ 📜GetDetailAddress.tsx
┃ ┣ 📜GetDistanceBtw.ts
┃ ┗ 📜KakaoMap.tsx
┣ 📂layout
┃ ┗ 📜Layout.tsx
┣ 📂lib
┃ ┗ 📜supabaseClient.ts
┣ 📂pages
┃ ┣ 📜Detail.tsx
┃ ┣ 📜Edit.tsx
┃ ┣ 📜EventProd.tsx
┃ ┣ 📜Login.tsx
┃ ┣ 📜Main.tsx
┃ ┣ 📜Mypage.tsx
┃ ┣ 📜PasswordChange.tsx
┃ ┣ 📜PasswordReset.tsx
┃ ┣ 📜PostModal.tsx
┃ ┣ 📜Register.tsx
┃ ┣ 📜Report.tsx
┃ ┣ 📜ReviewList.tsx
┃ ┣ 📜SearchResult.tsx
┃ ┗ 📜Write.tsx
┣ 📂shared
┃ ┣ 📜PrivateRoute.tsx
┃ ┗ 📜Router.tsx
┣ 📂styles
┃ ┣ 📜GlobalFont.ts
┃ ┣ 📜GlobalStyle.ts
┃ ┣ 📜styleBox.ts
┃ ┗ 📜styleFont.ts
┣ 📂types
┃ ┣ 📜supabase.ts
┃ ┗ 📜types.ts
┣ 📂utility
┃ ┣ 📜CreatedAt.tsx
┃ ┗ 📜guide.ts
┣ 📜App.tsx
┣ 📜badwords-ko.d.ts
┣ 📜index.tsx
┣ 📜react-app-env.d.ts
┣ 📜react-swipy.d.ts
┗ 📜toast.css
