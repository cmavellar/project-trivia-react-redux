import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
//   constructor(props) {
//     super(props);
//   }

routeLogin = () => {
  const { history } = this.props;
  history.push('/');
}

routeRanking = () => {
  const { history } = this.props;
  history.push('/ranking');
}

render() {
  return (
    <>
      <Header />
      <p data-testid="feedback-text">Feedback</p>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
