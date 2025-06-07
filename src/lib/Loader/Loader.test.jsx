import { render, screen } from '@testing-library/react';
import Loader from '.';

describe('Loader', () => {
  it('renderiza o spinner corretamente', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(document.querySelector('.loader__spinner')).toBeInTheDocument();
  });
});
