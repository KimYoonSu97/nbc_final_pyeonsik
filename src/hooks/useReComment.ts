import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteReCommentData, updateReCommentData, writeReCommentData } from "src/api/ReComment";

const useMutate = () => {
    const queryclient = useQueryClient();
    
    const success = {
        onSuccess: () => {
            queryclient.invalidateQueries(['reComment'])
        }
    }

    const writeReCommentMutation = useMutation(writeReCommentData,success)
    const deleteReCommentMutation = useMutation(deleteReCommentData,success)
    const updateReCommentMutation = useMutation(updateReCommentData,success)

    return {writeReCommentMutation, deleteReCommentMutation, updateReCommentMutation}
}
export default useMutate