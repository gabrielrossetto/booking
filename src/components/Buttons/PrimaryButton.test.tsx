import { render, fireEvent } from '@testing-library/react';
import PrimaryButton from './PrimaryButton';

describe('<PrimaryButton />', () => {
  it('should render PrimaryButton component with correct text', () => {
    const buttonText = "Click Me";
    const { getByText } = render(<PrimaryButton text={buttonText} onClick={() => { }} />);
    const buttonElement = getByText(buttonText);

    expect(buttonElement).toBeInTheDocument();
  });

  it('should render PrimaryButton component with specified class', () => {
    const buttonClassName = 'custom-class';
    const { container } = render(<PrimaryButton text="Click Me" onClick={() => { }} className={buttonClassName} />);
    const buttonElement = container.firstChild;

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(buttonClassName);
  });

  it('should call onClick function when button is clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<PrimaryButton text="Click Me" onClick={handleClick} />);
    const buttonElement = getByText('Click Me');

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
