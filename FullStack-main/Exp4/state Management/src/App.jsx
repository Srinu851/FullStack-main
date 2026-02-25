import React from 'react';
import { UserProvider } from './UserContext';
import DisplayComponent from './DisplayComponent';

function App() {
  return (
    <UserProvider> 
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>React Context API Lab</h1>
        <DisplayComponent />
      </div>
    </UserProvider>
  );
}

export default App;