import Routes from './Routes';
import { DataProvider } from './DataContext';
import './App.scss';
import TopBar from './Elements/TopBar';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <TopBar />
        <Routes />
      </DataProvider>
    </div>
  );
}

export default App;
