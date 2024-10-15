import React from 'react';
import { useRownd } from '@rownd/react';

const UserMenu = () => {
  const { is_authenticated, manageAccount, passkeys } = useRownd();

  if (!is_authenticated) {
    return null;
  }

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <button 
        onClick={() => passkeys.register()} 
        style={{ marginRight: '10px' }}
      >
        Add Passkey
      </button>
      <button onClick={() => manageAccount()}>
        👤 Profile
      </button>
    </div>
  );
};

export default UserMenu;