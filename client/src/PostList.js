import axios from 'axios';
import { useState, useEffect } from "react";

const PostList = () => {
  // matches initial empty value from POST in /posts/index.js
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');
    
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map(post => {
    return (
      <div
        key={post.id}
        className='card'
        style={{width: '30%', marginBottom: '20px'}}
      >
        <div className='card-body'>
          <h3>{post.postContent}</h3>
        </div>
      </div>
    )
  });

  console.log(posts);

  return (
    <div className="container d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  )
};

export default PostList;