import { render, screen, fireEvent } from '@testing-library/react';
import ErrorToast from '.';

describe('ErrorToast', () => {
  it('exibe a mensagem de erro', () => {
    render(<ErrorToast onClose={() => {}}>Erro de teste</ErrorToast>);
    expect(screen.getByText(/Erro de teste/i)).toBeInTheDocument();
  });

  it('chama onClose ao clicar no botão de fechar', () => {
    const onClose = vi.fn();
    render(<ErrorToast onClose={onClose}>Erro de teste</ErrorToast>);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
