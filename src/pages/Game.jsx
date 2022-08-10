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
      // disableBtn: false,
    };
  }

  componentDidMount() {
    this.fetchTriviaAPI();
  }

  componentDidUpdate() {
    this.handleTime();
  }

  handleTime = () => {
    const { timer } = this.state;
    const mil = 1000;
    if (timer > 0) {
      setTimeout(() => this.setState({ timer: timer - 1 }), mil);
    }
  }

  // componentDidUpdate(_prevProps, prevState) {
  //   this.clearTimer(prevState);
  // }

  // clearTimer = (prevState) => {
  //   if (prevState.timer === 0) {
  //     clearInterval(this.timeInterval);
  //     this.setState({
  //       disableBtn: true,
  //       timer: 0,
  //     });
  //   }
  // }

  // runQuestionTimer = () => {
  //   const oneSecond = 1000;
  //   this.timeInterval = setInterval(() => this.setState((prevState) => ({
  //     timer: prevState.timer - 1,
  //   })), oneSecond);
  // }

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

    const half = 0.5;
    const correct = data.results[0].correct_answer;
    const incorrect = data.results[0].incorrect_answers;

    this.setState({
      questions: data.results,
      allAnswers: data.results[0].type === 'multiple'
        ? [correct, ...incorrect]
          .sort(() => Math.random() - half)
        : [correct, incorrect].sort(() => Math.random() - half),
    });
  }

  answerBtnClick = () => {
    this.setState({
      correct: 'correct-answer',
      incorrect: 'wrong-answer',
      btnNext: true,
    });
  }

  render() {
    const { questions, allAnswers, correct, incorrect, timer, btnNext } = this.state;
    console.log(questions);
    return (
      <>
        <Header />
        <p>{ timer }</p>
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
              className={ answer === questions[0].correct_answer ? correct : incorrect }
              key={ index }
              onClick={ this.answerBtnClick }
              // disable={ disableBtn }
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
                // onClick={}
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
