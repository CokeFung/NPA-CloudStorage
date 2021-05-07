import logo from './logo.svg';
import './App.css';

import { DraggerContainer, StorageContainer } from  './npa/npa-container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className='App-logo' alt='app-logo' />
        <p className='Container-logo'>
          NPA - Cloud Storage
        </p>
        <DraggerContainer />
        <div className="Container-default">
            <div className="Container-title">
              <p>Files in storage</p>
            </div>
            <hr />
            <StorageContainer />
        </div>
      </header>
    </div>
  );
}

export default App;
