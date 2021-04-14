import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import TheLayout from './containers/TheLayout';
import { useSelector } from 'react-redux';
import AuthService from './services/AuthService';
import { setAuthToken } from './services/AuthService';

type State = {
  isLoggedIn: boolean;
};

function App() {
  const isLoggedIn = useSelector((state: State) => state.isLoggedIn);

  const redirect = () => {
    if (!isLoggedIn || !AuthService.isExpired()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Router>
      {isLoggedIn ? setAuthToken() : null}
      {redirect()}
      <Route
        path="/"
        component={!isLoggedIn || !AuthService.isExpired() ? Login : TheLayout}
        exact
      />
      <Route path="/admin" component={TheLayout} />
    </Router>
  );
}

export default App;
