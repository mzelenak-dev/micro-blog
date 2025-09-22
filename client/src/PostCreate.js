import axios from 'axios';
import { useState } from "react";

const PostCreate = ({title}) => {
  const [postContent, setPostContent] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:4000/posts', {
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