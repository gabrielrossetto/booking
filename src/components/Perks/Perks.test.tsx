import { render } from '@testing-library/react';
import Perks from './Perks';

describe('<Perks />', () => {
  const mockPerks = ['pets', 'wifi', 'cancelFree', 'selfCheckIn', 'n/a'];

  it('should render Perks component with correct text', () => {
    const { getByText } = render(<Perks perks={mockPerks} />);

    mockPerks.forEach((perk) => {
      const textElement = getByText(getPerkText(perk));

      expect(textElement).toBeInTheDocument();
    });
  });

  const getPerkText = (perkName: string) => {
    switch (perkName) {
      case 'pets':
        return 'Pets Allowed';
      case 'selfCheckIn':
        return 'Self check-in';
      case 'cancelFree':
        return 'Free cancellation';
      case 'wifi':
        return 'Wifi';
      default:
        return 'N/A';
    }
  };
});
