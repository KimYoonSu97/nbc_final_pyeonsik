import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "react-query";
import { getDetailPostData, getPostData } from "../api/post";
import { supabase } from "../supabse";

const Detail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [comment,setComment] = useState("")

  console.log(postId);
  const { data: postData } = useQuery("post", () => getDetailPostData(postId));
  console.log("data", postData);

  const commentSubmitButton = async(e:any) => {
    e.preventDefault()
    const newcomment = {
      comment,
      postId
    }
    await supabase.from('comment').insert(newcomment)
  }
  return (
    <div>
      <div>
        <div>
          {/* <p>{postData[0].title}</p>
          <p>{postData[0].body}</p> */}
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로
      </button>
      <form onSubmit={commentSubmitButton}>
        <input value={comment} onChange={(e)=>setComment(e.target.value)}></input>
        <button>댓글작성</button>
      </form>
    </div>
  );
};

export default Detail;
