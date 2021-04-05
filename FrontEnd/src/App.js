import React, { useEffect } from 'react';
import Routes from './Routes';
import { DataProvider } from './DataContext';
import './App.scss';
import TopBar from './Elements/TopBar';
import AuthChecker from './AuthChecker';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <AuthChecker>
          <TopBar />
          <Routes />
        </AuthChecker>
      </DataProvider>
    </div>
  );
}

export default App;
