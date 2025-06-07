import { render, screen } from '@testing-library/react';
import CustomTooltip from '.';

describe('CustomTooltip', () => {
  it('exibe ano e habitantes quando ativo e com payload', () => {
    render(<CustomTooltip active={true} label="2020" payload={[{ value: 7125 }]} />);
    expect(screen.getByText(/Ano:/i)).toBeInTheDocument();
    expect(screen.getByText(/2020/)).toBeInTheDocument();
    expect(screen.getByText(/Habitantes:/i)).toBeInTheDocument();
    expect(screen.getByText(/7.125/)).toBeInTheDocument();
  });

  it('retorna null quando não está ativo', () => {
    const { container } = render(
      <CustomTooltip active={false} label="2020" payload={[{ value: 7125 }]} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('retorna null quando não há payload', () => {
    const { container } = render(<CustomTooltip active={true} label="2020" payload={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
