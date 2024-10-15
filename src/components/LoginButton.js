import React from 'react';
import { useRownd } from '@rownd/react';

function LoginButton() {
  const { is_authenticated, requestSignIn, signOut } = useRownd();

  const handleAuth = () => {
    if (is_authenticated) {
      signOut();
    } else {
      requestSignIn();
    }
  };

  return (
    <button className="login-button" onClick={handleAuth}>
      {is_authenticated ? 'Log Out' : 'Log In'}
    </button>
  );
}

export default LoginButton;