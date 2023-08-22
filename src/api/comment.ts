import { supabase } from "src/supabse"

export interface CommentType  {
    comment: string;
    // created_at : string;
    id : string;
    postId : string | undefined;
    // userId : string;
  }

// 포스트에 아이디에 해당하는 댓글 가져오기
const getCommentData = async(id:string) => {
    const {data} = await supabase.from("comment").select("*").eq('postId',id)
    console.log("commentData",data)
    return data
}

//댓글 작성하기
const WriteCommentData = async (newcomment:Omit<CommentType,'id'>) => {
    await supabase.from('comment').insert([newcomment]);
}

//댓글 삭제하기
const deleteCommentData = async(id:string) => {
    await supabase.from("comment").delete().eq('id',id)
}

//댓글 수정하기
// const updateCommentData = async (comment:Pick<CommentType,'id' | 'comment'>) => {
//     await supabase.from("comment").update({comment:comment.comment}).eq('id',comment.id)
// }




export {getCommentData,WriteCommentData,deleteCommentData}