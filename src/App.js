import React from 'react';
import Calculator from './Calculator';
import UserMenu from './components/UserMenu';

function App() {
  return (
    <div className="App">
      <UserMenu />
      <Calculator />
    </div>
  );
}

export default App;