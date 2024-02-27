import React from 'react';
import { render } from '@testing-library/react';
import Divider from './Divider';

describe('<Divider />', () => {
  it('should render Divider component correctly', () => {
    const { container } = render(<Divider />);
    const dividerElement = container.firstChild;

    expect(dividerElement).toBeInTheDocument();
    expect(dividerElement).toHaveClass('MuiDivider-root');
    expect(dividerElement).toHaveClass('w-10/12');
    expect(dividerElement).toHaveClass('pt-4');
    expect(dividerElement).toHaveClass('text-additional');
  });
});