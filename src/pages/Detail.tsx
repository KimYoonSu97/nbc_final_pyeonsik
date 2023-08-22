import React from 'react';
import { useNavigate} from 'react-router';

import Comment from 'src/components/Detail/comments/Comment';

const Detail = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div>
        <div>
          {/* <p>{postData[0].title}</p>
          <p>{postData[0].body}</p>  */}
        </div>
      </div>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        홈으로
      </button>
     <Comment/>
    </div>
  );
};

export default Detail;
