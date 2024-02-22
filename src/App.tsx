import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './containers/Home/Home';
import Room from './containers/Room/Room';
import MyBookings from './containers/MyBookings/MyBooking';
import Header from './components/Header/Header';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="/mybookings" element={<MyBookings />} />
          {/* TODO: When no route */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;