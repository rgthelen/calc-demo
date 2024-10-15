import React from 'react';
import { useRownd } from '@rownd/react';

function UserMenu() {
  const { is_authenticated, requestSignIn, requestSignOut } = useRownd();

  const handleProfileClick = () => {
    // Add your profile button logic here
    console.log('Profile button clicked');
  };

  const handlePasskeyClick = () => {
    if (is_authenticated) {
      requestSignOut();
    } else {
      requestSignIn();
    }
  };

  return (
    <div className="auth-buttons">
      <button className="profile-button" onClick={handleProfileClick}>Profile</button>
      <button className="passkey-button" onClick={handlePasskeyClick}>
        {is_authenticated ? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  );
}

export default UserMenu;
