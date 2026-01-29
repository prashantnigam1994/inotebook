import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router';
import NoteState from './contexts/NoteState';
import Alerts from './components/Alerts';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alerts, setAlerts] = useState(null)
  const showAlert = (msg, type) => {
    setAlerts({ msg, type })
    setTimeout(() => {
      setAlerts(null)
    }, 2000);
  }
  return (
    <NoteState showAlert={showAlert}>
      <Router>
        <Navbar />
        <Alerts alerts={alerts} />
        <div className="container my-3">
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
