// import React, { useState } from 'react';
// import './EmailList.css';
// import AddIcon from '@mui/icons-material/Add';

// const emailsData = [
//   {
//     id: 1,
//     from: 'chinnamjanaki@gmail.com',
//     date: 'Mar 7',
//     subject: 'Subject 1',
//     body: 'Hello, how are you?',
//   },
//   {
//     id: 2,
//     from: 'john.doe@gmail.com',
//     date: 'Mar 8',
//     subject: 'Subject 2',
//     body: 'Just checking in.',
//   },
// ];

// const EmailList = ({ onSelectEmail }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredEmails = emailsData.filter(
//     (email) =>
//       email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       email.subject.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="email-list">
//       <div className="email-list-header">
//         <div><span>25/25 inboxes selected</span></div>
//         <div style={{padding:'0 0 0 10%'}}><AddIcon style={{ color: 'white', fontSize: '30px',background:'red' }} /></div>
//       </div>

//       <input
//         type="text"
//         placeholder="Search mail"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="search-bar"
//       />

//       <div className="email-items">
//         {filteredEmails.map((email) => (
//           <div
//             key={email.id}
//             className="email-item"
//             onClick={() => onSelectEmail(email)}
//           >
//             <span className="email-from">{email.from}</span>
//             <span className="email-date">{email.date}</span>
//             <p className="email-subject">{email.subject}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EmailList;


import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import './EmailList.css';
import axios from 'axios';

const EmailList = ({ onSelectEmail }) => {
  const [emails, setEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailClick = (email) => {
    if (expandedEmail === email._id) {
      // If clicking the same email, toggle visibility off
      setExpandedEmail(null);
    } else {
      // Set the clicked email as expanded
      setExpandedEmail(email._id);
    }
    onSelectEmail(email); // Optional, if you need to handle the selection elsewhere
  };

  // Fetch emails from backend
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:7000/Reademails');
        console.log(response);

        setEmails(response.data);
      } catch (error) {
        console.error('Failed to fetch emails', error);
      }
    };
    fetchEmails();
  }, [emailSubmitted]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmail = { from, to, subject, body };
      await axios.post('http://localhost:7000/emails', newEmail);
      // setEmails([...emails, newEmail]);  // Update email list after sending
      setEmailSubmitted(!emailSubmitted);

      handleClose();  // Close modal after submission
    } catch (error) {
      console.error('Failed to send email', error);
    }
  };

  const filteredEmails = emails.filter(
    (email) =>
      email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="email-list">
      <div className="email-list-header">
        <div><span>{emails.length}/{emails.length} inboxes selected</span></div>
        <div style={{ padding: '0 0 0 10%' }}>
          <AddIcon
            style={{ color: 'white', fontSize: '30px', background: 'red', cursor: 'pointer' }}
            onClick={handleOpen}
          />
        </div>
      </div>

      <input
        type="text"
        placeholder="Search mail"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="email-items">
        {filteredEmails.map((email, index) => (
          <div
            key={index}
            className="email-item"
            onClick={() => onSelectEmail(email)}
          >
            <span className="email-date">
              {new Date(email.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </span>

            <span className="email-from">{email.from}</span>
            <p className="email-subject">{email.subject}</p>
            {/* <span className="email-body">{email.body}</span> */}
            <p><span className="email-replies-count">
              {email.replies.length} {email.replies.length === 1 ? 'reply' : 'replies'}
            </span></p>
            {/* {expandedEmail === email._id && (
              <div className="email-replies">
                {email.replies.length > 0 ? (
                  email.replies.map((reply) => (
                    <div key={reply._id} className="email-reply">
                      <span className="reply-date">{reply.date}</span>
                      <p className="reply-body">{reply.body}</p>
                    </div>
                  ))
                ) : (
                  <p>No replies</p>
                )}
              </div>
            )} */}
          </div>
        ))}

      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="email-modal-title"
        aria-describedby="email-modal-description"
      >
        <div className="modal-form">
          <h2 id="email-modal-title">Compose Email</h2>
          <input
            type="text"
            name="from"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            name="to"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input-field"
          />
          <textarea
            name="body"
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea-field"
          />
          <div className="modal-actions">
            <button onClick={handleSubmit} className="send-button">Send</button>
            <button onClick={handleClose} className="cancel-button">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmailList;
