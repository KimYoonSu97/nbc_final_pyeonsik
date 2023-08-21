import { supabase } from "../supabse"

const getPostData = async () => {
    const {data}:any = await supabase.from('post').select(`*`)
    console.log(data)
    return data
  }
const delPostData = async (id:any) => {
  const {data}:any = await supabase.from('post').delete().eq('id',id)
}
const getDetailPostData = async (id:any) => {
    const {data}:any = await supabase.from('post').select("*").eq('id',id)
    console.log(data)
    return data
}

  export {getPostData,delPostData,getDetailPostData}