import { render, fireEvent } from '@testing-library/react';
import MyBookingsCard from './MyBookingsCard';

describe('<MyBookingsCard />', () => {
  const mockBooking = {
    id: '1',
    roomId: '101',
    checkInDate: '2024-03-01',
    checkOutDate: '2024-03-05',
    roomDetails: {
      id: '1',
      name: 'Luxury Suite',
      location: 'Hotel ABC',
      pricePerNight: 200,
      description: 'Description',
      imageUrl: 'https://www.google.com/',
      perks: ['wifi'],
    }
  };

  it('should render MyBookingsCard component with correct booking details', () => {
    const handleDeleteBooking = jest.fn();
    const handleUpdate = jest.fn();

    const { getByText } = render(
      <MyBookingsCard
        booking={mockBooking}
        handleDeleteBooking={handleDeleteBooking}
        handleUpdate={handleUpdate}
      />
    );

    const roomNameElement = getByText('Luxury Suite');
    const locationElement = getByText('Hotel ABC');
    const checkInDateElement = getByText('Check-in: 2024-03-01');
    const checkOutDateElement = getByText('Check-out: 2024-03-05');
    const pricePerNightElement = getByText('Price per night: $200');

    expect(roomNameElement).toBeInTheDocument();
    expect(locationElement).toBeInTheDocument();
    expect(checkInDateElement).toBeInTheDocument();
    expect(checkOutDateElement).toBeInTheDocument();
    expect(pricePerNightElement).toBeInTheDocument();
  });

  it('should call handleDeleteBooking when Delete button is clicked', () => {
    const handleDeleteBooking = jest.fn();
    const handleUpdate = jest.fn();

    const { getByText } = render(
      <MyBookingsCard
        booking={mockBooking}
        handleDeleteBooking={handleDeleteBooking}
        handleUpdate={handleUpdate}
      />
    );

    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    expect(handleDeleteBooking).toHaveBeenCalledWith('1');
  });

  it('should call handleUpdate when Update button is clicked', () => {
    const handleDeleteBooking = jest.fn();
    const handleUpdate = jest.fn();

    const { getByText } = render(
      <MyBookingsCard
        booking={mockBooking}
        handleDeleteBooking={handleDeleteBooking}
        handleUpdate={handleUpdate}
      />
    );

    const updateButton = getByText('Update');
    fireEvent.click(updateButton);

    expect(handleUpdate).toHaveBeenCalledWith('101', '2024-03-01', '2024-03-05');
  });
});
