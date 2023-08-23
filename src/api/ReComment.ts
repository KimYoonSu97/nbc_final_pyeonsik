import { supabase } from "src/supabse"

interface ReCommentType {
    id : string;
    parent_commentId : string;
    reComment : string;
}

const getReCommentData = async(id:string) => {
    const {data} = await supabase.from("reComment").select("*")
    console.log("re",data)
    return data
}

//댓글 작성하기
const writeReCommentData = async (newReComment:Omit<ReCommentType,'id' | 'parent_commentId'>) => {
    await supabase.from('reComment').insert([newReComment]);
}

//댓글 삭제하기
const deleteReCommentData = async(id:string) => {
    await supabase.from("reComment").delete().eq('id',id)
}

export {getReCommentData,writeReCommentData,deleteReCommentData}