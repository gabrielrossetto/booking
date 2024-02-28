# Hooks Documentation

### `useDataFetching` Hook

The `useDataFetching` hook facilitates data fetching operations related to bookings and rooms within your application. It integrates with Redux store slices to manage state and performs asynchronous requests to retrieve data from the server.

#### Usage

```javascript
import useDataFetching from './useDataFetching';

const Component = () => {
  const { 
    bookings, 
    rooms, 
    bookingsLoading, 
    roomsLoading, 
    handleAddBooking, 
    fetchRooms, 
    fetchBookings, 
    filterRooms, 
    bookingsWithRoomDetails, 
    handleDeleteBooking, 
    handleEditBooking, 
    getBookingByRoomId, 
    bookingsError, 
    roomsError 
  } = useDataFetching();

  ...
};
```

Functions
- `handleAddBooking`: Adds a new booking.
- `fetchRooms`: Retrieves rooms data from the server.
- `fetchBookings`: Fetches bookings data from the server.
- `filterRooms`: Filters available rooms based on check-in and check-out dates.
- `handleDeleteBooking`: Deletes a booking.
- `handleEditBooking`: Retrieves booking details by room ID.
- `getBookingByRoomId`: Retrieves booking details by room ID.


### `useDataFetching` Hook

The `useDataFetching` hook facilitates data fetching operations related to bookings and rooms within your application. It integrates with Redux store slices to manage state and performs asynchronous requests to retrieve data from the server.

#### Usage

```javascript
import useDataFetching from './useDataFetching';

const Component = () => {
  const { 
    bookings, 
    rooms, 
    bookingsLoading, 
    roomsLoading, 
    handleAddBooking, 
    fetchRooms, 
    fetchBookings, 
    filterRooms, 
    bookingsWithRoomDetails, 
    handleDeleteBooking, 
    handleEditBooking, 
    getBookingByRoomId, 
    bookingsError, 
    roomsError 
  } = useDataFetching();

  ...
};
```

Functions
- `handleAddBooking`: Adds a new booking.
- `fetchRooms`: Retrieves rooms data from the server.
- `fetchBookings`: Fetches bookings data from the server.
- `filterRooms`: Filters available rooms based on check-in and check-out dates.
- `handleDeleteBooking`: Deletes a booking.
- `handleEditBooking`: Retrieves booking details by room ID.
- `getBookingByRoomId`: Retrieves booking details by room ID.


### `useBookingValidation` Hook

The `useBookingValidation` hook provides functionality for validating booking details within your application. It utilizes Redux's `useSelector` hook to access rooms and bookings data from the Redux store, and Moment.js for date validation.

#### Usage

```javascript
import useBookingValidation from './useBookingValidation';

const Component = () => {
  const { validateBooking } = useBookingValidation();
  ...
};
```

Functions
- `validateBooking`: Validates booking details such as check-in and check-out dates, room availability, and overlap with existing bookings. It returns an error message if validation fails, otherwise returns null.

Parameters
- `checkInDate`: The selected check-in date for the booking.
- `checkOutDate`: The selected check-out date for the booking.
- `roomId`: The ID of the selected room for the booking.
- `isEditMode`: A boolean flag indicating whether the booking is in edit mode.

Returns
- `string | null`: An error message if validation fails, otherwise null.