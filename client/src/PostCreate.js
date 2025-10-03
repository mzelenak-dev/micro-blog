import axios from 'axios';
import { useState } from "react";

const PostCreate = ({title}) => {
  const [postContent, setPostContent] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    // posts.com dev url in /etc/hosts 
    await axios.post('http://posts.com/posts/create', {
      postContent
    });
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Post Content</label>
          <input 
            type="text"
            value={postContent}
            className="form-control"
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
};

export default PostCreate;