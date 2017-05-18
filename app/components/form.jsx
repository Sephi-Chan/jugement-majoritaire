import React from 'react';
import { extend } from 'underscore';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeStep = this.changeStep.bind(this);
    this.back = this.back.bind(this);
    this.startOver = this.startOver.bind(this);
    this.state = {
      questionIndex: 0,
      userChoices: {}
    };
  }


  changeStep(question, choice) {
    this.setState((oldState) => (extend({}, oldState, {
      questionIndex: oldState.questionIndex + 1,
      userChoices: extend({}, oldState.userChoices, { [question.title]: choice })
    })));
  }


  getQuestionOrResults() {
    if (this.props.questions.length == this.state.questionIndex) {
      return <Results userChoices={this.state.userChoices} entitiesShortNames={this.props.entitiesShortNames} />;
    }
    else {
      const currentQuestion = this.props.questions[this.state.questionIndex];
      const previousChoice = this.state.userChoices[currentQuestion.title];
      return <Question previousChoice={previousChoice} question={currentQuestion} onChoose={this.changeStep} />;
    }
  }


  back() {
    this.setState((oldState) => extend({}, oldState, {
      questionIndex: oldState.questionIndex - 1
    }));
  }


  startOver() {
    this.setState((oldState) => extend({}, oldState, {
      questionIndex: 0,
      userChoices: {}
    }));
  }


  getBackButton() {
    if (this.state.questionIndex == 0) return null;
    return (<button type="button" className="btn btn-primary" onClick={this.back}>&#9664; Précédent</button>);
  }


  getStartOverButton() {
    if (this.props.questions.length != this.state.questionIndex) return null;
    return (<button type="button" className="btn btn-success" onClick={this.startOver}>&#8634; Recommencer</button>);
  }

  getProgression() {
    if (this.props.questions.length == this.state.questionIndex) return null;
    return <Progression currentQuestionIndex={this.state.questionIndex} questionsCount={this.props.questions.length} />
  }


  render() {
    return (<div>
      <div className="jumbotron">
        <div className="container">
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
        </div>
      </div>

      <div className="container">
        {this.getQuestionOrResults()}
        {this.getProgression()}
        {this.getBackButton()} {this.getStartOverButton()}
      </div>
    </div>);
  }
}
