import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
routeLogin = () => {
  const { history } = this.props;
  history.push('/');
}

routeRanking = () => {
  const { history } = this.props;
  history.push('/ranking');
}

render() {
  const { assertions } = this.props;
  const positiveFeedback = 'Well Done!';
  const negativeFeedback = 'Could be better...';
  const threshold = 3;
  return (
    <>
      <Header />
      <p data-testid="feedback-text">
        { assertions >= threshold ? positiveFeedback : negativeFeedback }
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
