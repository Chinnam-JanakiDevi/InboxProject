
// import React, { useState } from 'react';
// import { CssBaseline, Box } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import Home from './components/Home';
// import Onebox from './components/Onebox';
// import EmailList from './components/EmailList';
// import EmailDetails from './components/EmailDetails';
// import './App.css';

// function App() {
//   const [selectedEmail, setSelectedEmail] = useState(null);

//   const handleSelectEmail = (email) => {
//     setSelectedEmail(email);
//   };

//   return (
//     <div>
//       <CssBaseline />
//       <div className="app">
//         <Sidebar />
//         <div className="main">
//           <Header />
//           <Box sx={{ display: 'flex', backgroundColor: 'black', height: '100vh' }}>
//             <Box component="main" sx={{ display: 'flex', flexGrow: 1 }}>
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route
//                   path="/mails"
//                   element={
//                     <Box sx={{ display: 'flex', width: '100%' }}>
//                       {/* EmailList will take 25% of the width */}
//                       <Box sx={{ width: '25%', borderRight: '1px solid gray' }}>
//                         <EmailList onSelectEmail={handleSelectEmail} />
//                       </Box>

//                       {/* EmailDetails will take 75% of the width */}
//                       <Box sx={{ width: '100%'}}>
//                         <EmailDetails selectedEmail={selectedEmail} />
//                       </Box>
//                     </Box>
//                   }
//                 />
//               </Routes>
//             </Box>
//           </Box>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { CssBaseline, Box, IconButton } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './components/Home';
import EmailList from './components/EmailList';
import EmailDetails from './components/EmailDetails';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from '@mui/material/useMediaQuery';
import './App.css';

function App() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showEmailList, setShowEmailList] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    if (isSmallScreen) {
      setShowEmailList(false);
    }
  };

  const handleBackToEmailList = () => {
    setShowEmailList(true);
  };

  return (
    <div>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <div className="main">
          <Header />
          <Box sx={{ display: 'flex', backgroundColor: 'black', height: '100vh' }}>
            <Box component="main" sx={{ display: 'flex', flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/mails"
                  element={
                    <Box sx={{ display: 'flex', width: '100%' }}>
                      {/* Conditionally render EmailList and EmailDetails based on screen size and state */}
                      {isSmallScreen && !showEmailList ? (
                        <Box sx={{ width: '100%' }}>
                          <IconButton
                            onClick={handleBackToEmailList}
                            sx={{ color: 'white', padding: '10px' }}
                          >
                            <ArrowBackIcon />
                          </IconButton>
                          <EmailDetails selectedEmail={selectedEmail} />
                        </Box>
                      ) : (
                        <>
                          <Box
                            sx={{
                              width: isSmallScreen ? '100%' : '25%',
                              borderRight: isSmallScreen ? 'none' : '1px solid gray',
                              display: showEmailList ? 'block' : 'none',
                            }}
                          >
                            <EmailList onSelectEmail={handleSelectEmail} />
                          </Box>
                          {!isSmallScreen && (
                            <Box sx={{ width: '75%' }}>
                              <EmailDetails selectedEmail={selectedEmail} />
                            </Box>
                          )}
                        </>
                      )}
                    </Box>
                  }
                />
              </Routes>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default App;
