import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      allAnswers: [],
      correct: 'correct',
      incorrect: 'wrong',
      timer: 30,
      btnNext: false,
      indexQuestion: 0,
      runTimer: true,
    };
  }

  componentDidMount() {
    this.fetchTriviaAPI();
  }

  componentDidUpdate() {
    const { runTimer } = this.state;
    if (runTimer) {
      this.handleTime();
    }
  }

  handleTime = () => {
    const { timer } = this.state;
    const mil = 1000;
    if (timer > 0) {
      setTimeout(() => this.setState({ timer: timer - 1 }), mil);
    }
  }

  // clearTimer = () => {
  //   clearInterval(this.timeInterval);
  //   this.setState({
  //     timer: 30,
  //   });
  // }

  // runQuestionTimer = () => {
  //   const oneSecond = 1000;
  //   this.timeInterval = setInterval(() => this.setState((prevState) => ({
  //     timer: prevState.timer - 1,
  //   })), oneSecond);
  // }

  updateAnswers = () => {
    const { questions, indexQuestion } = this.state;
    const half = 0.5;
    const correct = questions[indexQuestion].correct_answer;
    const incorrect = questions[indexQuestion].incorrect_answers;

    this.setState({
      allAnswers: questions[indexQuestion].type === 'multiple'
        ? [correct, ...incorrect]
          .sort(() => Math.random() - half)
        : [correct, incorrect].sort(() => Math.random() - half),
    });
  }

  fetchTriviaAPI = async () => {
    const { history } = this.props;

    const token = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL);
    const data = await response.json();

    if (data.response_code !== 0) {
      localStorage.clear();
      history.push('/');
    }

    this.setState({
      questions: data.results,
    }, () => this.updateAnswers());
  }

  answerBtnClick = () => {
    this.setState({
      correct: 'correct-answer',
      incorrect: 'wrong-answer',
      btnNext: true,
      runTimer: false,
    });
  }

  handleNext = () => {
    const { indexQuestion } = this.state;
    const maxIndex = 4;

    if (indexQuestion !== maxIndex) {
      this.setState({
        indexQuestion: indexQuestion + 1,
        correct: 'correct',
        incorrect: 'wrong',
        runTimer: true,
        timer: 30,
      }, () => this.updateAnswers());
    }
    if (indexQuestion === maxIndex) {
      const { history } = this.props;
      history.push('/feedback');
    }
    // clearTimer();
  }

  render() {
    const {
      questions,
      allAnswers,
      correct,
      incorrect,
      timer,
      btnNext,
      indexQuestion,
    } = this.state;
    console.log(questions);
    return (
      <>
        <Header />
        <p>{ timer }</p>
        { questions.length > 0 && (
          <div>
            <p data-testid="question-category">{ questions[indexQuestion].category }</p>
            <p data-testid="question-text">{ questions[indexQuestion].question }</p>
          </div>)}
        <div data-testid="answer-options">
          { allAnswers.length > 0 && allAnswers.map((answer, index) => (
            <button
              type="button"
              data-testid={ answer === questions[indexQuestion].correct_answer
                ? 'correct-answer' : `wrong-answer-${index}` }
              className={ answer === questions[indexQuestion].correct_answer
                ? correct : incorrect }
              key={ index }
              onClick={ this.answerBtnClick }
              disabled={ timer < 1 }
            >
              { answer }
            </button>
          )) }
          <div>
            { btnNext && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNext }
              >
                Next
              </button>
            )}
          </div>
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
