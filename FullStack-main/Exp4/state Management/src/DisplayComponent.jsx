import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const DisplayComponent = () => {
  const { user, updateUsername } = useContext(UserContext);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
      <h2>Hello, {user}!</h2>
      <input
        type="text"
        value={user}
        onChange={(e) => updateUsername(e.target.value)}
        placeholder="Enter your name"
        style={{
          padding: '10px',
          fontSize: '1em',
          marginRight: '10px',
          borderRadius: '4px',
          border: '1px solid #646cff'
        }}
      />
      <button onClick={() => updateUsername("React Developer")}>
        Reset Global Name
      </button>
    </div>
  );
};

export default DisplayComponent;