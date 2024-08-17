import React from 'react';
import EmailList from './EmailList';
import EmailDetails from './EmailDetails';
import './Onebox.css';

const Onebox = () => {
  return (
    <div className="onebox">
      <EmailList />
    </div>
  );
};

export default Onebox;
