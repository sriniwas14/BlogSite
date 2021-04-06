import React, { useEffect } from 'react';
import Routes from './Routes';
import { DataProvider } from './DataContext';
import './App.scss';
import AuthChecker from './AuthChecker';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <AuthChecker>
          <Routes />
        </AuthChecker>
      </DataProvider>
    </div>
  );
}

export default App;
