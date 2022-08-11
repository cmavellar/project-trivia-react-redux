import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing the Login Page', () => {
  it('Checking the existence of inputs and buttons', () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const { pathname } = history.location;
      expect(pathname).toBe('/');

      const inputName = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
      const buttonPlay = screen.getByRole('button', { name: /play/i });
      const buttonSettings = screen.getByTestId('btn-settings')

      expect(inputName).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument();
      expect(buttonPlay).toBeInTheDocument();
      expect(buttonSettings).toBeInTheDocument();

  });

  it('Tests if after clicking the play button, it redirects to the game page', async () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const inputName = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
      const buttonPlay = screen.getByRole('button', { name: /play/i });

      userEvent.type(inputName, "João");
      userEvent.type(inputEmail, "joão@uol.com.br");
      expect(buttonPlay).not.toBeDisabled(); 

      userEvent.click(buttonPlay);

      const namePlayer = await screen.getByTestId("header-player-name");
      const { pathname } = history.location;
      expect(namePlayer).toHaveTextContent('João');
      expect(pathname).toBe('/game');         
  })
  
  it('Checks if the play button is activated when typing in the name and email fields', () => {
      renderWithRouterAndRedux(<App />);

      const inputName = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
      const buttonPlay = screen.getByRole('button', { name: /play/i });

      expect(buttonPlay).toHaveAttribute('disabled');
      userEvent.type(inputName, 'Joãozinho');
      expect(buttonPlay).toHaveAttribute('disabled');
      userEvent.type(inputEmail, 'joaozinho@trybe.com');
      expect(buttonPlay).not.toHaveAttribute('disabled');
    });

  it('Tests if after clicking the play button, it redirects to the settings page', ()=> {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByTestId('btn-settings')
    expect(buttonSettings).toBeInTheDocument();

    userEvent.click(buttonSettings);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');

    const settings = screen.getByTestId('settings-title');
    expect(settings).toBeInTheDocument();
  })

  it('Test the request from the API', ()=> {
    renderWithRouterAndRedux(<App />)

    const dataTriviaApi = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataTriviaApi),
    });

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, 'Teste');
    userEvent.type(inputEmail, 'teste@teste.com')
    userEvent.click(buttonPlay);
    expect(global.fetch).toHaveBeenCalled()
  })
});
