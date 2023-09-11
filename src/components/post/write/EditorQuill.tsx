import React from 'react';
import { useRef, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module-ts';
import 'react-quill/dist/quill.snow.css';
import 'src/components/post/write/StyledEditorQuill.css';
import { CommonBodyProps } from 'src/types/types';
import styled from 'styled-components';

import supabase from 'src/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { LIMIT_3MB, LIMIT_5MB } from 'src/utility/guide';

Quill.register('modules/ImageResize', ImageResize);

const EditorQuill = ({ body, setBody }: CommonBodyProps) => {
  const QuillRef = useRef<ReactQuill>();

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files![0];
      console.log(file.size);
      if (file.size && file.size > 3 * 1024 * 1024) {
        toast(LIMIT_3MB);
        return;
      }

      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // return new Promise(() => {
      //   reader.onload = () => {
      //     setProfileImgSrc(reader.result as string);
      //   };
      // });

      // try {
      //   const res = await imageApi({ img: file });
      //   const url = [];
      //   if (file) {
      //     const { data, error } = await supabase.storage.from('photos').upload(`editor/${file}`, file);
      //     if (error) {
      //       console.error('Error uploading image to Supabase storage:', error);
      //       toast('이미지 업로드 중 에러가 발생했습니다!');
      //       return;
      //     }
      //     url.push(data.path);
      //   }
      //   const imgUrl = res.data.imgUrl;

      //   const editor = quillRef.current.getEditor();
      //   const range = editor.getSelection();
      //   editor.insertEmbed(range.index, 'image', imgUrl);
      //   editor.setSelection(range.index + 1);
      // } catch (error) {
      //   console.log(error);
      // }
    });
  };

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
        ],
        handlers: {
          image: imageHandler
          // handlers object will be merged with default handlers object
          // link: function (body) {
          //   if (body) {
          //     var href = prompt('Enter the URL');
          //     this.quill.format('link', href);
          //   } else {
          //     this.quill.format('link', false);
          //   }
          // }
        }
      }
    }),
    []
  );

  return (
    <Container>
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
    </Container>
  );
};

export default EditorQuill;

const Container = styled.div``;
