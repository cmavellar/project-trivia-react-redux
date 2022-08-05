import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      player: '',
      email: '',
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { player, email } = this.state;
    return (
      <form>
        <input
          type="text"
          data-testid="input-player-name"
          placeholder="Nome"
          onChange={ this.handleInputChange }
          name="player"
          value={ player }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          placeholder="E-mail"
          onChange={ this.handleInputChange }
          name="email"
          value={ email }
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ () => {} }
          disabled={ !(player && email) }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
