import styled from 'styled-components';

export const S = {
  WritePostArea: styled.div`
    margin-top: 84px;
  `,
  WriteArea: styled.div`
    width: 950px;
    margin: 0 auto;
  `,
  LogoContainer: styled.div`
    color: white;
    width: 80px;
    height: 22px;
    /* position: absolute; */
    left: 16px;
  `,

  WriteForm: styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  WriteHeader: styled.header`
    width: 100%;
    height: 56px;
    margin-bottom: 28px;
    background-color: white;

    position: fixed;
    z-index: 99;
    top: 0;
    right: 0;
    /* padding: 11px 16px; */
    /* gap: 1082px; */
  `,
  WriteHeaderBox: styled.div`
    margin: 0 auto;
    max-width: 1280px;
    padding: 11px 16px;
    display: flex;
    align-items: center;
  `,

  AddButton: styled.button`
    margin-left: auto;
    background: var(--main, #f02826);

    width: 110px;
    height: 34px;
    padding: 5px 15px;
    gap: 4px;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--white, #fff);

    /* button-medium */

    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
  `,

  AddText: styled.div`
    color: #000;
    font-style: normal;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px; /* 150% */
  `,

  AddIcon: styled.div`
    width: 20px;
    height: 20px;
  `,

  TitleBox: styled.div`
    background: #fff;
    width: 950px;
    margin-bottom: 12px;
    padding: 9px 20px;
    gap: 20px;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
  `,

  CategoryText: styled.div`
    color: #000;

    font-style: normal;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
  `,

  Contour: styled.div`
    background: #f6f7f9;

    width: 2px;
    height: 18px;
    border-radius: 100px;
  `,

  Title: styled.input`
    border: none;
    outline: none;

    color: #000;
    width: 723px;

    font-style: normal;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px; /* 150% */
  `,

  SelectCategory: styled.div`
    gap: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
  `,

  SelectIcon: styled.div`
    width: 20px;
    height: 20px;
  `,

  SelectText: styled.button`
    background-color: transparent;
    padding: 0px;
    color: var(--neutral-400, #98a2b3);
    font-style: normal;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
  `
};
