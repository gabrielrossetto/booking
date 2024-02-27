import { render, fireEvent } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('<Header />', () => {
  it('should render Header component with avatar and My Bookings button', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const myBookingsButton = getByText('My Bookings');
    const headerIcon = getByAltText('Hostfully');

    expect(myBookingsButton).toBeInTheDocument();
    expect(headerIcon).toBeInTheDocument();
  });

  it('should navigate to /mybookings when My Bookings button is clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const myBookingsButton = getByText('My Bookings');
    fireEvent.click(myBookingsButton);

    expect(window.location.pathname).toBe('/mybookings');
  });
});
