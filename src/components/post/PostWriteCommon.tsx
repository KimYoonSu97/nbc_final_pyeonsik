import React from 'react';
import { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';

import ReactQuill, { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module-ts';
import 'react-quill/dist/quill.snow.css';
import useMutate from 'src/hooks/usePost';
import PostWriteInput from './PostWriteInput';

Quill.register('modules/ImageResize', ImageResize);

// recipe, common write component 정리 필요
const PostWriteCommon = () => {
  // user id 윤수님
  const userId = 'be029d54-dc65-4332-84dc-10213d299c53';

  const navigate = useNavigate();
  const { addPostMutate } = useMutate();

  const QuillRef = useRef<ReactQuill>();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const postRef = useRef<HTMLInputElement>(null);

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
          [{ header: '1' }, { header: '2' }, { font: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
          ['image', 'video']
        ]
      }
    }),
    []
  );

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = {
      postCategory: 'common',
      userId,
      title,
      body
    };
    addPostMutate.mutate(newPost);
    navigate(`/`);
  };

  return (
    <form onSubmit={submitPost}>
      <PostWriteInput
        ref={postRef}
        type="text"
        name="title"
        title="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        autoFocus
      />
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
        placeholder="내용을 입력해주세요."
      />
      <button>add</button>
    </form>
  );
};

export default PostWriteCommon;
