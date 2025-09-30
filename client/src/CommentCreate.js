import axios from 'axios';
import { useState } from "react";

const CommentCreate = ({postId}) => {
  const [content, setContent] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    // posts.com dev url in /etc/hosts
    await axios.post(`http://posts.com:4001/posts/${postId}/comments`, {
      content
    });

    setContent('');
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Create new comment</label>
          <input 
            type="text"
            value={content}
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
};

export default CommentCreate;