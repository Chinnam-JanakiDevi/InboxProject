import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MailIcon from '@mui/icons-material/Mail';
import TelegramIcon from '@mui/icons-material/Telegram';
import ListIcon from '@mui/icons-material/List';
import ArchiveIcon from '@mui/icons-material/Archive';
import PollIcon from '@mui/icons-material/Poll';
import PersonIcon from '@mui/icons-material/Person';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '60px', backgroundColor: '#2C2C2C', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          marginBottom: '5px',
          cursor: 'pointer',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HomeIcon style={{ color: 'white', fontSize: '30px' }} />
      </button>
      <button
        onClick={() => navigate('/mails')}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          marginBottom: '5px',
          cursor: 'pointer',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PersonSearchIcon style={{ color: 'white', fontSize: '30px' }} />
      </button>
      <button
        onClick={() => navigate('/mails')}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          marginBottom: '5px',
          cursor: 'pointer',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MailIcon style={{ color: 'white', fontSize: '30px' }} />
      </button>
      <button
        onClick={() => navigate('/')}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          marginBottom: '5px',
          cursor: 'pointer',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TelegramIcon style={{ color: 'white', fontSize: '30px' }} />
      </button>
      <button
        onClick={() => navigate('/')}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          marginBottom: '5px',
          cursor: 'pointer',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ListIcon style={{ color: 'white', fontSize: '30px' }} />
      </button>
      <button
        onClick={() => navigate('/')}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          marginBottom: '5px',
          cursor: 'pointer',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ArchiveIcon style={{ color: 'white', fontSize: '30px' }} />
      </button>
      <button
        onClick={() => navigate('/')}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          marginBottom: '100px',
          cursor: 'pointer',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PollIcon style={{ color: 'white', fontSize: '30px' }} />
      </button>
      <button
        onClick={() => navigate('/')}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PersonIcon style={{ color: 'white', fontSize: '30px' }} />
      </button>
    </div>
  );
}

export default Sidebar;
