// import React from 'react';
// import './EmailDetails.css';

// const EmailDetails = () => {
//   return (
//     <div className="email-details">
//       <div className="email-header">
//         <h3>New Product Launch</h3>
//         <span>from: jeanne@icloud.com</span>
//       </div>
//       <div className="email-content">
//         <p>Hi, I would like to introduce you to SaaSpro, a productized design service...</p>
//       </div>
//       <button className="reply-button">Reply</button>
//     </div>
//   );
// };

// export default EmailDetails;

import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import './EmailDetails.css';

const EmailDetails = ({ selectedEmail, setSelectedEmail }) => {
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies((prevShowReplies) => !prevShowReplies);
  };
  const handleReply = () => {
    setReplyMode(true);
  };

  const handleSendReply = async () => {
    try {
      await axios.post(`http://localhost:7000/reply/${selectedEmail._id}`, {
        from: selectedEmail.to, // Assuming the reply is sent back to the sender
        to: selectedEmail.from,
        subject: `Re: ${selectedEmail.subject}`,
        body: replyContent,
      });
      alert('Reply sent successfully!');
      setReplyMode(false);
      setReplyContent('');

      // Optionally, update the selectedEmail's replies in the state
      setSelectedEmail((prevEmail) => ({
        ...prevEmail,
        replies: [...prevEmail.replies, { from: selectedEmail.to, date: new Date().toISOString(), body: replyContent }]
      }));
    } catch (error) {
      console.error('Failed to send reply', error);
      // alert('Failed to send reply.');
    }
  };

  return (
    <div className="email-details-container">
      {selectedEmail ? (
        <>
          <div>
            <h3><b>Subject : </b>{selectedEmail.subject}</h3>
            <p>From: {selectedEmail.from}</p>
            {/* <p>To: {selectedEmail.to}</p> */}
            <p>Body : {selectedEmail.body}</p>
            <div className="email-replies">
              <p>Total replies: {selectedEmail.replies.length}</p>
              <button onClick={toggleReplies}>
                {showReplies ? 'Hide Replies' : 'View Replies'}
              </button>

              {showReplies && selectedEmail.replies && selectedEmail.replies.length > 0 ? (
                selectedEmail.replies.map((reply, replyIndex) => (
                  <div key={reply._id || replyIndex} className="email-reply">
                    <p className="reply-body">
                      Reply-{replyIndex + 1}
                      <p>{reply.body}</p>
                    </p>
                  </div>
                ))
              ) : (
                showReplies && <p>No replies</p>
              )}
            </div>

            <button onClick={handleReply}>Reply</button>
          </div>
          <Modal
            open={replyMode}
            onClose={() => setReplyMode(false)}
            aria-labelledby="reply-modal-title"
            aria-describedby="reply-modal-description"
          >
            <div className="reply-modal">
              <div className="reply-header">
                <input
                  type="text"
                  value={selectedEmail.to}
                  readOnly
                  className="reply-input"
                  placeholder="To"
                />
                <input
                  type="text"
                  value={selectedEmail.from}
                  readOnly
                  className="reply-input"
                  placeholder="From"
                />
                <input
                  type="text"
                  value={`Re: ${selectedEmail.subject}`}
                  readOnly
                  className="reply-input"
                  placeholder="Subject"
                />
              </div>
              <textarea
                className="reply-textarea"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Type your reply here..."
              />
              <div className="reply-actions">
                <button className="send-button" onClick={handleSendReply}>
                  Send
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setReplyMode(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <p>Please select an email to view details.</p>
      )}
    </div>
  );
};

export default EmailDetails;

// import React from 'react';
// import './EmailDetails.css';

// const EmailDetails = ({ selectedEmail }) => {
//   if (!selectedEmail) {
//     return <div className="email-detail">Select an email to view details</div>;
//   }

//   return (
//     <div className="email-detail">
//       <h3>To: {selectedEmail.from}</h3>
//       <h4>Subject: {selectedEmail.subject}</h4>
//       <p>{selectedEmail.body}</p>
//       <button className="reply-button">Reply</button>
//     </div>
//   );
// };

// export default EmailDetails;
