import MovieProfile from './app/movieProfile/movieProfile'
import { Provider } from 'react-redux';
import store from './app/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <MovieProfile />
    </Provider>
  );
}

export default App;
