import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoomCard from './RoomCard';

describe('<RoomCard />', () => {
  const mockRoom = {
    id: '1',
    name: 'Sample Room',
    location: 'Sample Location',
    imageUrl: 'https://www.google.com/sample.jpg',
    pricePerNight: 100,
    description: 'Description',
    perks: ['wifi'],
  };
  const mockCheckInDate = new Date('2024-03-01');
  const mockCheckOutDate = new Date('2024-03-03');

  it('should render RoomCard component with correct content', () => {
    const { getByText, getByAltText } = render(
      <Router>
        <RoomCard room={mockRoom} checkInDate={mockCheckInDate} checkOutDate={mockCheckOutDate} />
      </Router>
    );

    const roomNameElement = getByText(mockRoom.name);
    const roomLocationElement = getByText(mockRoom.location);
    const roomImageElement = getByAltText('Placeholder');

    expect(roomNameElement).toBeInTheDocument();
    expect(roomLocationElement).toBeInTheDocument();
    expect(roomImageElement).toBeInTheDocument();
  });
});