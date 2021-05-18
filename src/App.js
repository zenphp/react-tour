import logo from './logo.svg';
import './App.css';
import {Board} from './board/Board.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click on a space to start the knight's tour.
        </p>
       <Board />
      </header>
    </div>
  );
}

export default App;
