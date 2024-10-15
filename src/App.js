import React from 'react';
import Calculator from './components/Calculator';
import LoginButton from './components/LoginButton';
import { useRownd } from '@rownd/react';

function App() {
  const { is_authenticated } = useRownd();

  return (
    <div className="App">
      <h1>Calculator App</h1>
      <LoginButton />
      {is_authenticated ? (
        <Calculator />
      ) : (
        <p>Please log in to use the calculator.</p>
      )}
    </div>
  );
}

export default App;