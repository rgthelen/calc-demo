import React from 'react';
import ReactDOM from 'react-dom/client';
import { RowndProvider } from '@rownd/react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RowndProvider appKey="<key_gdv3hrbj0kvybb0ksvdc93aw>">
      <App />
    </RowndProvider>
  </React.StrictMode>
);
