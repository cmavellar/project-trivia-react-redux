import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { newScore } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    this.setPlayerInfo();
  }

  setPlayerInfo = () => {
    const { name, score, gravatarEmail } = this.props;
    const playerInfo = {
      name,
      score,
      gravatarEmail,
    };

    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', '[]');
    }
    console.log(playerInfo);

    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const newRanking = [...ranking, playerInfo];

    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  routeLogin = () => {
    const { history, newGameScore } = this.props;
    newGameScore();
    history.push('/');
  }

  routeRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    const positiveFeedback = 'Well Done!';
    const negativeFeedback = 'Could be better...';
    const threshold = 3;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          { assertions >= threshold ? positiveFeedback : negativeFeedback }
        </p>
        <p>
          Placar final:
          { ' ' }
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <p>
          Total de acertos:
          { ' ' }
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.routeLogin }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.routeRanking }
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  newGameScore: () => dispatch(newScore()),
});

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
