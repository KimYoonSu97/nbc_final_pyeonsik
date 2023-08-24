import React, { useEffect, useState } from 'react';
import supabase from 'src/lib/supabaseClient';
import { Post, Tag } from 'src/types/types';

const Fetch = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  //실행 시 tag테이블에 있는 모든 데이터를 가져옴
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*');

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  console.log('posts', posts);

  // 태그 클릭 시 해당 선택한 태그의 데이터를 보기 위해 tag와 null로 조건부로 바꿔줌
  const handleTagClick = (tag: Tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          {post.tagimage && (
            <div style={{ position: 'relative' }}>
              <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.tagimage}`} alt={`${post.id}`} />
              {/* 여기서 불러온 이미지에 태그를 찍는다 */}
              {post.tags.map((tag, tagIndex) => (
                <div
                  key={tagIndex}
                  style={{
                    position: 'absolute',
                    left: tag.x + 'px',
                    top: tag.y + 'px',
                    backgroundColor: 'red',
                    width: '30px',
                    height: '30px'
                  }}
                  onClick={() => handleTagClick(tag)}
                >
                  {/* 선택된 태그가 있다면 해당 태그를 열고 안에있는 데이터를 보여줌 */}
                  {selectedTag === tag && (
                    <div
                      className="details"
                      style={{
                        backgroundColor: 'skyblue',
                        width: '300px',
                        height: '300px'
                      }}
                    >
                      {tag.prodData}
                      <br />
                      {tag.price}
                      <img src={tag.img} alt="상품 이미지" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Fetch;
