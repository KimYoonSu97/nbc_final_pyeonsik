import React from 'react';
import { useRef, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module-ts';
import 'react-quill/dist/quill.snow.css';
import 'src/components/post/write/StyledEditorQuill.css';
import { CommonBodyProps } from 'src/types/types';

import { toast } from 'react-toastify';
import { LIMIT_3MB } from 'src/utility/guide';

Quill.register('modules/ImageResize', ImageResize);

const EditorQuill = ({ body, setBody }: CommonBodyProps) => {
  const QuillRef = useRef<ReactQuill>();

  const handlerImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files![0];
      if (file !== null && file.size > 3 * 1024 * 1024) {
        toast(LIMIT_3MB);
        return;
      }

      const editor = QuillRef.current?.getEditor();
      const range = editor?.getSelection()?.index;
      if (range !== null && range !== undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise(() => {
          reader.onload = () => {
            editor?.setSelection(range, 1);
            editor?.insertEmbed(range, 'image', reader.result);
          };
          return;
        });
      }
    };
  };

  // const handlerLink = (body: string) => {
  //   if (body) {
  //     const href = prompt('Enter the URL');
  //     this?.quill.format('link', href);
  //   } else {
  //     this?.quill.format('link', false);
  //   }
  // };

  var bold = Quill.import('formats/bold');
  bold.tagName = 'b';
  Quill.register(bold, true);

  var italic = Quill.import('formats/italic');
  italic.tagName = 'i';
  Quill.register(italic, true);

  const modules = useMemo(
    () => ({
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
      },
      toolbar: {
        container: [
          [{ size: ['small', false, 'large'] }],
          [],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['clean'],
          [],
          ['image', 'video', 'link']
        ],
        handlers: {
          image: handlerImage
        }
      }
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
