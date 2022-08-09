import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      allAnswers: [],
    };
  }

  componentDidMount() {
    this.fetchTriviaAPI();
  }

  fetchTriviaAPI = async () => {
    const { history } = this.props;
    const { allAnswers } = this.state;

    const token = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL);
    const data = await response.json();

    if (data.response_code !== 0) {
      localStorage.clear();
      history.push('/');
    }

    const half = 0.5;
    const correct = data.results[0].correct_answer;
    const incorrect = data.results[0].incorrect_answers;

    this.setState({
      questions: data.results,
      allAnswers: data.results[0].type === 'multiple'
        ? [correct, ...incorrect]
          .sort(() => Math.random() - meio)
        : [correct, incorrect].sort(() => Math.random() - meio),
    });
  }

  render() {
    const { questions, allAnswers } = this.state;
    console.log(questions);
    return (
      <>
        <Header />
        { questions.length > 0 && (
          <div>
            <p data-testid="question-category">{ questions[0].category }</p>
            <p data-testid="question-text">{ questions[0].question }</p>
          </div>)}
        <div data-testid="answer-options">
          { allAnswers.length > 0 && allAnswers.map((answer, index) => (
            <button
              type="button"
              data-testid={ answer === questions[0].correct_answer
                ? 'correct-answer' : `wrong-answer-${index}` }
              key={ index }
            >
              { answer }
            </button>
          )) }
        </div>
      </>

    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
