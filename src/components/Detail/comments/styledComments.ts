import { styled } from 'styled-components';

export const CommentWriteWrap = styled.div`
  margin-bottom: 30px;
  form {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    position: relative;
    left: 0;
    top: 0;
    p {
      display: block;
      width: 36px;
      height: 36px;
      border-radius: 49%;
      background-color: #efefef;
    }
    input {
      display: block;
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 10px;
      background-color: #efefef;
      outline: none;
    }
    ::placeholder {
      color: #8c8c8c;
    }
    button {
      position: absolute;
      right: 5px;
      top: 50%;
      margin-top: -13px;
      cursor: pointer;
      img {
        position: relative;
        right: 0;
        top: 0;
      }
    }
  }
`;

export const CommentWrap = styled.div``;

export const CommentInner = styled.div`
  margin: 12px 0px;
  h2 {
    border: solid 1px #eee;
    padding: 10px 14px;
  }
`;
