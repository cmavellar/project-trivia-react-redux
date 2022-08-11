import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const picturePlayer = md5(gravatarEmail).toString();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${picturePlayer}` }
          alt={ name }
        />
        <span data-testid="header-player-name">
          Nome:
          { name }
        </span>
        <br />
        <p>
          Pontuação:
          { ' ' }
          <span data-testid="header-score">{ score }</span>
        </p>
      </header>

    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
