import React from 'react';
import { useRef, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module-ts';
import 'react-quill/dist/quill.snow.css';
import { CommonBodyProps } from 'src/types/types';
import styled from 'styled-components';
import 'src/components/post/write/StyledQuill.css';

Quill.register('modules/ImageResize', ImageResize);

const EditorQuill = ({ body, setBody }: CommonBodyProps) => {
  const QuillRef = useRef<ReactQuill>();

  // quill에서 사용할 module 설정 code
  // key 입력 시 imageHandler로 인한 focus 풀림 방지
  const modules = useMemo(
    () => ({
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
      },
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean', 'image', 'video'] // remove formatting button
        ]
      }
      // handlers: {
      //   // handlers object will be merged with default handlers object
      //   link: function (body) {
      //     if (body) {
      //       var href = prompt('Enter the URL');
      //       this.quill.format('link', href);
      //     } else {
      //       this.quill.format('link', false);
      //     }
      //   }
      // }
    }),
    []
  );

  return (
    <S.EditorBox>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        modules={modules}
        value={body}
        onChange={setBody}
        theme="snow"
        placeholder="그르르…갉 편의점 의자에서 나누는 대화처럼 재밌는 이야기를 공유해 주세요."
      />
    </S.EditorBox>
  );
};

export default EditorQuill;

export const S = {
  EditorBox: styled.div`
    background: #fff;
    border-radius: 10px;
    margin-top: 12px;
    width: 950px;
  `
};
