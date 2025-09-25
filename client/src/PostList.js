import axios from 'axios';
import { useState, useEffect } from "react";
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  // matches initial empty value from POST in /posts/index.js
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:4002/posts');
      setPosts(res.data);
    } catch(err) {
      console.error(err);
    }
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
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    )
  });

  return (
    <div className="container d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  )
};

export default PostList;