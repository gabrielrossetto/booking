import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RoundSearchButton from './RoundSearchButton';

describe('<RoundSearchButton />', () => {
  it('should render RoundSearchButton component with search icon', () => {
    const { getByTestId } = render(<RoundSearchButton onClick={() => { }} />);
    const searchIconElement = getByTestId('SearchIcon');

    expect(searchIconElement).toBeInTheDocument();
  });

  it('should call onClick function when button is clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(<RoundSearchButton onClick={handleClick} />);
    const buttonElement = container.firstChild;

    if (buttonElement) {
      fireEvent.click(buttonElement);
    }

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
