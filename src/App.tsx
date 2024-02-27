import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import 'react-toastify/dist/ReactToastify.css';
import store from './store/store';
import Home from './containers/Home/Home';
import Room from './containers/Room/Room';
import MyBookings from './containers/MyBookings/MyBooking';
import Header from './components/Header/Header';
import NotFound from './containers/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <>
          <ToastContainer />
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/room/:id" element={<Room />} />
              <Route path="/mybookings" element={<MyBookings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </>
      </LocalizationProvider>
    </Provider>
  );
};

export default App;
