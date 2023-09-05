import styled from 'styled-components';

export const S = {
  ImageTagContainer: styled.div`
    display: flex;

    position: relative;
    gap: 12px;
    padding-bottom: 20px;
  `,
  AddTagButton: styled.div`
    width: 180px;
    height: 48px;

    /* height: 48px; */
    /* wi */
    /* padding: 12px 32px 12px 33px; */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    /* flex-shrink: 0; */
    border-radius: 100px;
    background: var(--white, #fff);

    color: var(--font-black, var(--Black, #242424));
    text-align: center;
    position: absolute;

    bottom: 32px;
    left: calc((474px - 180px) / 2);

    /* label-large */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
    &:hover {
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      /* translate:  */
    }
  `,
  IconBox: styled.div`
    width: 20px;
    height: 20px;
    background: var(--neutral-200, #e4e7ec);
    border-radius: 50px;
    justify-content: center;
    display: flex;
    align-items: center;
  `,

  ImageContainer: styled.div`
    position: relative;
    border-radius: 10px;
    /* overflow: hidden; */
    /* background-color: royalblue; */
    /* margin-right: 10px; */
  `,
  // 이미지 태그 사이즈 고정....

  Image: styled.img`
    width: 474px;
    height: 360px;
    object-fit: cover;
    border-radius: 10px;
  `,

  TagImage: styled.img`
    width: 80px;
    height: 80px;
  `,

  TagContainer: styled.div`
    width: 356px;
    height: 100px;
    display: flex;
    align-items: center;
    background-size: 30px;
    position: absolute;
    display: flex;
    width: 20px;
    height: 20px;
  `,

  TagDataContainer: styled.div<{ searchFormHandler: boolean }>`
    margin-top: 150px;
    z-index: 2;
    position: absolute;
    left: -178px;
    width: 356px;
    height: 100px;
    background-color: ${(props) => (props.searchFormHandler ? 'transparent' : 'white')};
    display: flex;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 10px;
  `,

  DataContainer: styled.div`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
  `,

  ProdContainer: styled.div`
    width: 246px;
    font-size: 16px;
    height: 50px;
  `,

  ProdBrandContainer: styled.div`
    width: 113px;
    margin-bottom: 5px;
    font-size: 14px;
    height: 20px;
  `,

  DeleteButton: styled.button`
    width: 24px;
    height: 16px;
    font-size: 8px;
    background-color: transparent;
    cursor: pointer;
  `,

  CloseButton: styled.button`
    width: 40px;
    height: 30px;
    position: absolute;
    right: 30px;
    top: 25px;
    /* margin-left: 300px; */
    /* margin-top: 5px; */
    cursor: pointer;
    color: black;
    background-color: transparent;

    &:hover {
      color: gray;
    }
  `,

  SearchResultsContainer: styled.div`
    width: 400px;
    height: 478px;
    border-radius: 10px;
    background-color: white;
    position: relative;

    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  `,

  DeleteIconContainer: styled.div`
    display: flex;
    width: 34px;
    margin-left: 210px;
    align-items: center;
  `,

  TagIconContainer: styled.div`
    /* width: 40px; */
    /* height: 40px; */
    /* background-color: white; */
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
  `,
  TagIconBox: styled.div`
    width: 40px;
    height: 40px;

    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: white;

    position: absolute;
    top: -30px;
    left: -20px;
  `
};
