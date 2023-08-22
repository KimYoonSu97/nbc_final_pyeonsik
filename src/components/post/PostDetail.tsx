import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from 'src/types/types';
import { deletePost, getPost } from '../api/posts';

const PostDetail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams<string>();

  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Post'] });
    }
  });

  // read
  const { isLoading, data } = useQuery({ queryKey: ['Post'], queryFn: () => getPost(id!) });

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }

  const post = data?.data[0] as Post;

  // delete
  const clickDelete = (id: string) => {
    deleteMutation.mutate(id);
    navigate('/');
  };

  const clickEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.body}</div>
      <button onClick={() => clickDelete(post.id)}>delete</button>
      <button onClick={clickEdit}>edit</button>
    </div>
  );
};

export default PostDetail;
