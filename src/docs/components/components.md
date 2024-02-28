# Component Documentation

## PrimaryButton Component

The `PrimaryButton` component is a primary button used for important actions in the user interface.

### Properties:

- `text`: (string) The text displayed on the button.
- `onClick`: (function) The function to be executed when the button is clicked.
- `className`: (string) Additional CSS class to customize the button's style.

### Example Usage:

```jsx
import PrimaryButton from './PrimaryButton';
<PrimaryButton
  text="Click Here"
  onClick={() => { console.log('Button clicked'); }}
  className="my-custom-class"
/>
```

## RoundSearchButton Component

The `RoundSearchButton` component is a round button used to initiate a search in the user interface.

### Properties:

- `onClick`: (function) The function to be executed when the button is clicked.

### Example Usage:

```jsx
import RoundSearchButton from './RoundSearchButton';
<RoundSearchButton onClick={() => { console.log('Search button clicked'); 
```

## DataError Component

The `DataError` component is used to display an error message when there's an issue loading data.

### Example Usage:

```jsx
import DataError from './DataError';
<DataError />
```

## Divider Component

The `Divider` component is used to create a horizontal line to divide content.

### Example Usage:

```jsx
import Divider from './Divider';
<Divider />
```

## Header Component

The `Header` component represents the top navigation bar of the application.

```jsx
import Header from './Header';
<Header />
```

This component includes a logo on the left side and a "My Bookings" button on the right side. The user's avatar is displayed on the far right.

## MyBookingsCard Component

The `MyBookingsCard` component represents a card displaying booking details.

### Properties:

- `booking`: (object) The booking details containing information about the room and booking dates.
- `handleDeleteBooking`: (function) Callback function to handle the deletion of a booking.
- `handleUpdate`: (function) Callback function to handle the updating of a booking.

### Example Usage:

```jsx
import MyBookingsCard from './MyBookingsCard';
<MyBookingsCard
  booking={{
    id: '1',
    roomId: '101',
    checkInDate: '2024-03-01',
    checkOutDate: '2024-03-05',
    roomDetails: {
      name: 'Luxury Suite',
      location: 'Example Location',
      pricePerNight: 200
    }
  }}
  handleDeleteBooking={(id) => console.log(`Delete booking with ID: ${id}`)}
  handleUpdate={(roomId, checkInDate, checkOutDate) => console.log(`Update booking for room ${roomId} from ${checkInDate} to ${checkOutDate}`)}
/>
```

## Perks Component

The `Perks` component displays a list of perks associated with a room.

### Properties:

- `perks`: (array) An array containing the names of perks associated with the room.

### Example Usage:

```jsx
import Perks from './Perks';
<Perks perks={['pets', 'wifi', 'selfCheckIn', 'cancelFree']} />
```

## RoomCard Component

The `RoomCard` component represents a card displaying details of a room.

### Properties:

- `room`: (object) Details of the room including location, image URL, name, and price per night.
- `checkInDate`: (Date | null) The check-in date for booking the room.
- `checkOutDate`: (Date | null) The check-out date for booking the room.

### Example Usage:

```jsx
import RoomCard from './RoomCard';

<RoomCard
  room={{
    id: '101',
    name: 'Luxury Suite',
    location: 'Example Location',
    imageUrl: 'https://example.com/image.jpg',
    pricePerNight: 200
  }}
  checkInDate={new Date('2024-03-01')}
  checkOutDate={new Date('2024-03-05')}
/>
```