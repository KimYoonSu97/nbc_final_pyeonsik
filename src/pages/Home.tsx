import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabse";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { delPostData, getPostData } from "../api/post";

const Home = () => {
  const [user, setUser] = useState<any>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const {data:postData} = useQuery('post',getPostData)
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(delPostData, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });



  useEffect(() => {
    getPostData()
    getUserData()
    getData();
  }, []);

  const getUserData = async () => {
    const { data }: any = await supabase.from("users").select();
    console.log("userData",data)
  };


  const getData = async () => {
    const { data }: any = await supabase.auth.getSession();
    if (data) {
      setUser(data.session.user);
    }
  };

  const signout = async () => {
    await supabase.auth.signOut();
    navigate("/sign")
  };

  const writePostBtn = async (e: any) => {
    e.preventDefault();
    const newPost = {
      title,
      body,
      // userid: user.id,
    };
    try {
      await supabase.from("post").insert(newPost);
      alert("작성완료")
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const delPostButton = async (id:any) => {
    if (window.confirm('글을 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    } else {
      alert('글 삭제를 취소합니다.');
    }
  }

  return (
    <>
      {user ? (
        <div>
          {user.email}
          <p>{user.user_metadata.nickname ?? "익명"}</p>
          <button onClick={signout}>로그아웃</button>
        </div>
      ) : (
        <button
          onClick={() => {
            navigate("/sign");
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
      <div>
        {postData?.map((post:any)=>{
          return(
            <div key={post.id}  style={{border:"solid 1px #000",padding:"10px",margin:"10px"}}>
              <div>{post.title}</div>
              <div>{post.body}</div>
              <div>{post.created_at}</div>
              <button onClick={()=>{
                navigate(`/Detail/${post.id}`)
              }}>상세정보</button>
              <button onClick={()=>delPostButton(post.id)}>삭제</button>
            </div>
          )
        })}
 
      </div>
    </>
  );
};

export default Home;
