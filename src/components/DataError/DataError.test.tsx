import React from 'react';
import { render } from '@testing-library/react';
import DataError from './DataError';

describe('<DataError />', () => {
  it('should render DataError component with correct text', () => {
    const { getByText } = render(<DataError />);
    const errorTextElement = getByText('Error loading data');

    expect(errorTextElement).toBeInTheDocument();
  });

  it('should render DataError component with specified variant', () => {
    const { getByText } = render(<DataError />);
    const errorTextElement = getByText('Error loading data');

    expect(errorTextElement).toHaveClass('font-bold');
    expect(errorTextElement).toHaveClass('text-black');
    expect(errorTextElement.tagName).toEqual('H4');
  });

  it('should render DataError component within a container with specified class', () => {
    const { container } = render(<DataError />);
    const containerElement = container.firstChild;

    expect(containerElement).toBeInTheDocument();
    expect(containerElement).toHaveClass('flex');
    expect(containerElement).toHaveClass('items-center');
    expect(containerElement).toHaveClass('justify-center');
    expect(containerElement).toHaveClass('mt-8');
  });
});