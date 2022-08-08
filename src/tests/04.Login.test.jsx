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
        const buttonSettings = screen.getByRole('button', { name: /settings/i });

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

        const namePlayer = await screen.findByText('Nome:João');
        const { pathname } = history.location;
        expect(namePlayer).toBeInTheDocument();
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

        const buttonSettings = screen.getByRole('button', { name: /settings/i });
        expect(buttonSettings).toBeInTheDocument();

        userEvent.click(buttonSettings);
        const { pathname } = history.location;
        expect(pathname).toBe('/settings');

        const settings = screen.getByTestId('settings-title');
        expect(settings).toBeInTheDocument();

      })


});
