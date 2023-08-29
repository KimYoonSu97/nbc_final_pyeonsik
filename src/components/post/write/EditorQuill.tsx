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
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ font: [] }],
          // [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          // ['blockquote', 'code-block'],

          // [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],

          // [{ script: 'sub' }, { script: 'super' }],
          // [{ indent: '-1' }, { indent: '+1' }],
          // [{ direction: 'rtl' }],

          ['image', 'video', 'clean']
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
  );
};

export default EditorQuill;
