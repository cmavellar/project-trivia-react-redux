import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
//   constructor(props) {
//     super(props);
//   }
routeLogin = () => {
  const { history } = this.props;
  history.push('/');
}

render() {
  return (
    <div>
      <h1
        data-testid="ranking-title"
      >
        Ranking
      </h1>
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

export default Ranking;
