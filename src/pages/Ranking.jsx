import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newScore } from '../redux/actions';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  routeLogin = () => {
    const { history, newGameScore } = this.props;
    newGameScore();
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = ranking.map((player) => Object.values(player))
      .sort((a, b) => b[1] - a[1]);
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <ol>
          { orderedRanking && orderedRanking.map((player, index) => (
            <li key={ `player-name-${index}` }>
              <p>
                Jogador:
                { ' ' }
                <span data-testid={ `player-name-${index}` }>{ player[0] }</span>
              </p>
              <p>
                Pontuação
                { ' ' }
                <span data-testid={ `player-score-${index}` }>{ player[1] }</span>
              </p>
            </li>
          )) }
        </ol>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.routeLogin }
        >
          Voltar para o início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  newGameScore: () => dispatch(newScore()),
});

export default connect(null, mapDispatchToProps)(Ranking);
