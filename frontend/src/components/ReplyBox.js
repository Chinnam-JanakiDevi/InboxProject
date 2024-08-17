import React from 'react';
import './ReplyBox.css';

const ReplyBox = () => {
  return (
    <div className="reply-box">
      <textarea placeholder="Type your reply..."></textarea>
      <button>Send</button>
    </div>
  );
};

export default ReplyBox;
