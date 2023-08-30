import { useMutation, useQueryClient } from "@tanstack/react-query"
import { WriteCommentData, deleteCommentData, updateCommentData } from "src/api/comment";

const useMutate = () => {
    const queryclient = useQueryClient();
    
    const success = {
        onSuccess: () => {
            queryclient.invalidateQueries(['detailcomments'])
        }
    }

    const writeCommentMutation = useMutation(WriteCommentData,success)
    const deleteCommentMutation = useMutation(deleteCommentData,success)
    const updateCommentMutation = useMutation(updateCommentData,success)

    return {writeCommentMutation, deleteCommentMutation, updateCommentMutation}
}
export default useMutate