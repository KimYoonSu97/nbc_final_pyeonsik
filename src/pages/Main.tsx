import SideBar from 'src/components/sidebar/SideBar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../supabse';

const Main = () => {
  // const [user] = useAtom(userAtom);
  const [user,setUser] = useState<any>()
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const navigate = useNavigate();

  console.log("usersssssss",user)

  interface CommentType  {
    comment: string;
    created_at : string;
    id : string;
    postId : string;
    userId : string;
  }


  useEffect(() => {

    getData();
  }, []);


  const getData = async () => {
    const { data }: any = await supabase.auth.getSession();
    console.log('userdatataaa', data.session.user);
    if (data) {
      setUser(data.session.user);
    }
  };
  // console.log('user', user.id);

  const signout = async () => {
    await supabase.auth.signOut();
    navigate('/sign');
  };

  const writePostBtn = async (e: any) => {
    e.preventDefault();
    const newPost = {
      title,
      body
    };
    try {
      await supabase.from('post').insert(newPost);
      alert('작성완료');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SideBar />
      {user ? (
        <div>
          {user.email}
          <p>{user.user_metadata.nickname ?? '익명'}</p>
          <button onClick={signout}>로그아웃</button>
        </div>
      ) : (
        <button
          onClick={() => {
            navigate('/sign');
          }}
        >
          로그인회원가입
        </button>
      )}
      <form onSubmit={writePostBtn}>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <input value={body} onChange={(e) => setBody(e.target.value)}></input>
        <button>글쓰기</button>
      </form>
    </div>
  );
};

export default Main;
