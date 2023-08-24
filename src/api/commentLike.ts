import { supabase } from 'src/supabse';

interface LikeType {
    id: string;
    commentId : string;
    userId : string;
}

const getLike = async () => {
  const { data } = await supabase.from('comment_likes').select("commentId,userId")
  console.log(data,"likedataaaaaaaa")
  return data
};

const addLike = async ({commentId,userId}:{commentId : string,userId:string}) => {
    await supabase.from('comment_likes').insert({commentId,userId})
}

const deleteLike = async ({commentId,userId}:{commentId : string,userId:string}) => {
    await supabase.from('comment_likes').delete().eq('commentId', commentId).eq('userId', userId);
}

export {getLike,addLike,deleteLike}
