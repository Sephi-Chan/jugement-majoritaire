import React from 'react'
import { addChoice, removeChoice, startVote } from 'components/actions'
import { map } from 'underscore'


class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.dispatch(removeChoice(this.props.choice))
  }

  render() {
    return (<tr>
      <td>{this.props.choice}</td>
      <td><button onClick={this.handleClick}>supprimer</button></td>
    </tr>);
  }
}


function ChoicesList({ choices, dispatch }) {
  return (<table>
    <tbody>
      {map(choices, function(choice){
        return (<Choice key={choice} {...{ choice, dispatch }}>{choice}</Choice>);
      })}
    </tbody>
  </table>);
}


export default class PrepareChoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = { choice: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }


  handleChange(event) {
    this.setState({ choice: event.target.value });
  }


  handleStart(event) {
    this.props.dispatch(startVote());
  }


  handleSubmit(event) {
    event.preventDefault();
    this.choiceInput.focus();

    if(this.state.choice.trim() != '') {
      this.setState({ choice: '' });
      this.props.dispatch(addChoice(this.state.choice));
    }
  }


  componentDidMount() {
    this.choiceInput.focus();
  }


  render() {
    return (<div>
      <h2>Ajouter des choix</h2>

      <ChoicesList {...this.props} />

      <form onSubmit={this.handleSubmit}>
        <input value={this.state.choice} onChange={this.handleChange} ref={(el) => this.choiceInput = el} />
        &nbsp;
        <button>Ajouter ce choix</button> <button onClick={this.handleStart}>Commencer le vote</button>
      </form>
    </div>);
  }
}
