import PropTypes from 'prop-types';
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

  handleClick = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    localStorage.setItem('token', json.token);
    const { history } = this.props;
    history.push('/game');
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
          onClick={ this.handleClick }
          disabled={ !(player && email) }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;