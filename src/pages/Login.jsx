import PropTypes from 'prop-types';
import React from 'react';
// import md5 from 'crypto-js/md5';

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

  routeGame = async () => {
    // const { player, email } = this.state;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    console.log('teste');
    // const rankingObj = [{
    //   name: player,
    //   score: 0,
    //   picture: md5(email).toString(),
    // }];
    localStorage.setItem('token', json.token);
    // localStorage.setItem('ranking', JSON.stringify(rankingObj));
    const { history } = this.props;
    history.push('/game');
  }

  routeSettings = () => {
    const { history } = this.props;
    history.push('/settings');
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
          onClick={ this.routeGame }
          disabled={ !(player && email) }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.routeSettings }
        >
          Settings
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
