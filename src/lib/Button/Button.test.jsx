import { render, screen, fireEvent } from '@testing-library/react';
import Button from '.';

describe('Button', () => {
  it('renderiza o conteúdo corretamente', () => {
    render(<Button onClick={() => {}}>Clique aqui</Button>);
    expect(screen.getByText(/Clique aqui/i)).toBeInTheDocument();
  });

  it('chama onClick ao ser clicado', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Clique</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('aplica as classes circle e flat', () => {
    render(
      <Button onClick={() => {}} circle flat>
        Teste
      </Button>
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/button/);
    expect(btn.className).toMatch(/button--circle/);
    expect(btn.className).toMatch(/button--flat/);
  });

  it('aplica a cor de fundo passada pela prop color', () => {
    render(
      <Button onClick={() => {}} color="red">
        Colorido
      </Button>
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });
});
