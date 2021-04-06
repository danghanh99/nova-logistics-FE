import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import TheLayout from './containers/TheLayout';

function App() {
  return (
    <Router>
      <Route path="/" component={TheLayout} />
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default App;
